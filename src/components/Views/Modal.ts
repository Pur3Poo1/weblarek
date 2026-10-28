import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { IModalData } from "../../types";

export class Modal extends Component<IModalData> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement){
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', container);

        this.closeButton.addEventListener('click', () =>{
            this.events.emit('modal:close');
        });

        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.events.emit('modal:close');
            }
        });
    }

    set content(value:HTMLElement){
        this.contentElement.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }
}