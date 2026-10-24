import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types";


export class Card<T extends IProduct> extends Component<T>{
    protected categoryElement: HTMLElement;
    protected titleElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
    }
        set id(value: string){
            this.container.dataset.id = value;
        }

        set category(value:string){
            this.categoryElement.textContent = value;
            this.categoryElement.className = ('card_category');
        }

        set title(value:string){
        this.titleElement.textContent = value;
        }

        set image(value: string){
            this.setImage(this.imageElement, value, this.titleElement.textContent ?? 'Изображение товара')
        }

        set price(value:number|null){
            this.priceElement.textContent = value === null ? 'Бесценно' : `${value} синапсов`;
        }
}
