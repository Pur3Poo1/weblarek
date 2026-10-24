import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { IProduct } from "../../../types";


export class CardPreview extends Card<IProduct> {
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', container);

        this.buttonElement.addEventListener('click', () =>{
            this.events.emit('card:action', {id: this.container.dataset.id});
        })
    }

    set description(value:string){
        this.descriptionElement.textContent = value;
    }

    set inBasket(value: boolean){
        this.buttonElement.textContent = value ? 'Удалить из корзины': 'В корзину';
    }

    set price(value:number | null){
        super.price = value;
        this.buttonElement.disabled = value === null;
    }

}