import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Products {
    private items: IProduct[] = [];
    private preview: IProduct | null = null;

    constructor(protected events: IEvents){}

    //Сохранение массива товаров
    setItems(items: IProduct[]): void {
        this.items = items;
        this.events.emit('products:changed',{ items: this.items });
    }

    //Получение массива товаров
    getItems(): IProduct[] {
        return this.items;
    }

    //Получение товара по его id
    getItem(id: string): IProduct | undefined {
        return this.items.find((item) => item.id === id);
    }

    //Сохранение товара для подробного отображения
    setPreview(item: IProduct): void{
        this.preview = item;
        this.events.emit('preview:changed', { item: this.preview })
    }

    //Получение товара для подробного отображения
    getPreview(): IProduct | null {
        return this.preview;
    }
}