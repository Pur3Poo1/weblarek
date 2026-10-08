import { IProduct } from "../../types";

export class Cart {
    private items: IProduct[] = [];

    //Получение массива товаров их корзины
    getItems(): IProduct[] {
        return this.items;
    }

    //Добавление товара в корзину
    addItem(item: IProduct): void {
        this.items.push(item);
    }

    //Удаление товара из корзины
    removeItem(item: IProduct): void {
        this.items = this.items.filter((i) => i.id !== item.id);
    }

    //Очистка корзины
    clear(): void {
        this.items = [];
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