import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IHeader{
    counter: number;
}

export class Header extends Component<IHeader> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement){
        super(container);

        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);

        this.basketButton.addEventListener('click', () =>{
            this.events.emit('basket:open');
        })
    }
    // объект HeaderData у которого будет counter:value
    
    //принимает какое-то значение типа число сеттер
    set counter(value:number){
        this.counterElement.textContent = String(value);
    }
}