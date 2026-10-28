import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { IBasketData } from '../../types';

export class Basket extends Component<IBasketData> {
    protected listElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected orderButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', container);
        this.priceElement = ensureElement<HTMLElement>('.basket__price', container);
        this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', container);

        this.orderButton.addEventListener('click', () => {
            this.events.emit('order:start');
        });
    }

    set items(value: HTMLElement[]) {
        this.listElement.replaceChildren(...value);
    }

    set total(value: number) {
        this.priceElement.textContent = `${value} синапсов`;
    }

    set canOrder(value: boolean) {
        this.orderButton.disabled = !value;
    }
}