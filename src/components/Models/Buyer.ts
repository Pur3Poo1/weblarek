import { IBuyer } from "../../types";

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export class Buyer {
    private data: IBuyer = {
        payment: '',
        email: '',
        phone: '',
        address: '',
    };

    //Сохранение данных с одного или нескольких полей
    setData(data: Partial<IBuyer>): void {
        this.data = { ...this.data, ...data };
    }

    //Получение всех данных о покупателе
    getData(): IBuyer {
        return { ...this.data };
    }

    //Очистка данных о покупателе
    clear(): void {
        this.data = { payment: '', email: '', phone: '', address: '' };
    }

    //Валидация данных о покупателе
    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {};

        if (!this.data.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.data.email) {
            errors.email = 'Укажите емэйл';
        }
        if (!this.data.phone) {
            errors.phone = 'Укажите телефон';
        }
        if (!this.data.address) {
            errors.address = 'Укажите адрес';
        }

        return errors;
    }
}