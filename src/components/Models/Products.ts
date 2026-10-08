import { IProduct } from "../../types";

export class Products {
    private items: IProduct[] = [];
    private preview: IProduct | null = null;

    //Сохранение массива товаров
    setItems(items: IProduct[]): void {
        this.items = items;
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
    }

    //Получение товара для подробного отображения
    getPreview(): IProduct | null {
        return this.preview;
    }
}