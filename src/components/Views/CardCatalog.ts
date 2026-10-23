import { Card } from "./Card";
import { IEvents } from "../base/Events";
import { IProduct } from "../../types";

export class CardCatalog extends Card<IProduct> {
    constructor(protected events: IEvents, container: HTMLElement){
        super(container);

        this.container.addEventListener('click', () =>{
            this.events.emit('card:select', {id: this.container.dataset.id});
        })
    }
}