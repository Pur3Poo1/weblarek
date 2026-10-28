import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { categoryMap,CDN_URL } from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { IProduct } from "../../../types";


export class CardPreview extends Card<IProduct> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', container);

        this.buttonElement.addEventListener('click', () => {
            this.events.emit('card:action', { id: this.container.dataset.id });
        });
    }

    set image(value: string) {
        this.setImage(this.imageElement, CDN_URL + value);
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        for (const [name, modifier] of Object.entries(categoryMap)) {
            this.categoryElement.classList.toggle(modifier, name === value);
        }
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set inBasket(value: boolean) {
        this.buttonElement.textContent = value ? 'Удалить из корзины' : 'В корзину';
    }

    set price(value: number | null) {
        super.price = value;
        this.buttonElement.disabled = value === null;
    }
}