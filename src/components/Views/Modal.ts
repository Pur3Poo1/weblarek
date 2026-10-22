import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";


interface IModalData{
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement){
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);

        this.closeButton.addEventListener('click', () =>{
            this.events.emit('modal:close');
        });
    }
    
    set isOpen(value:boolean){
        this.container.classList.toggle('modal_active', value);
    }

    set content(value:HTMLElement){
        this.container.replaceChildren(value);
    }
}