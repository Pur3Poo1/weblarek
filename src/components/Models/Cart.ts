import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
    private items: IProduct[] = [];

    constructor(protected events: IEvents){}

    //Получение массива товаров их корзины
    getItems(): IProduct[] {
        return this.items;
    }

    //Добавление товара в корзину
    addItem(item: IProduct): void {
        if (!this.hasItem(item.id)) {
            this.items.push(item);
            this.events.emit('basket:changed', { items: this.items });
        }
    }

    //Удаление товара из корзины
    removeItem(item: IProduct): void {
        this.items = this.items.filter((i) => i.id !== item.id);
        this.events.emit('basket:changed', { items: this.items });
    }

    //Очистка корзины
    clear(): void {
        this.items = [];
        this.events.emit('basket:changed', { items: this.items });
    }

    //Получение/расчет стоимости товаров в корзине
    getTotalPrice(): number {
        return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
    }

    //Получение количества товаров в корзине
    getCount(): number {
        return this.items.length;
    }

    //Проверка наличия товара по его id
    hasItem(id: string): boolean {
        return this.items.some((item) => item.id === id);
    }
}