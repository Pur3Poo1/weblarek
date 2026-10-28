import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { categoryMap, CDN_URL} from "../../../utils/constants";
import { IEvents } from "../../base/Events";
import { IProduct } from "../../../types";


export class CardCatalog extends Card<IProduct> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);

        this.container.addEventListener('click', () => {
            this.events.emit('card:select', { id: this.container.dataset.id });
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
}