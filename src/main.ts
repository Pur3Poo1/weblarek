import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { Products } from './components/Models/Products';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';

import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { AppApi } from './components/Models/AppApi';


/*Проверка работы методов класса Products*/
const productsModel = new Products();
productsModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', productsModel.getItems());

const firstProduct = productsModel.getItems()[0];
productsModel.setPreview(firstProduct);
console.log('Товар для подробного отображения:', productsModel.getPreview());

console.log('Товар по id:', productsModel.getItem(firstProduct.id));

/*Проверка работы методов класса Cart*/
const basketModel = new Cart();
basketModel.addItem(firstProduct);
basketModel.addItem(productsModel.getItems()[1]);

console.log('Товары в корзине:', basketModel.getItems());
console.log('Количество товаров:', basketModel.getCount());
console.log('Общая стоимость:', basketModel.getTotalPrice());
console.log('Есть ли товар в корзине?', basketModel.hasItem(firstProduct.id));

basketModel.removeItem(firstProduct);
console.log('После удаления:', basketModel.getItems());

basketModel.clear();
console.log('После очистки:', basketModel.getItems());

/*Проверка работы методов класса Buyers*/
const buyerModel = new Buyer();
console.log('Пустой покупатель:', buyerModel.getData());
console.log('Ошибки валидации:', buyerModel.validate());

buyerModel.setData({ email: 'test@mail.ru' });
console.log('После setData email:', buyerModel.getData());
console.log('Ошибки после установки email:', buyerModel.validate());

buyerModel.setData({ payment: 'card', address: 'Москва' });
console.log('После добавления payment и address:', buyerModel.getData());

buyerModel.clear();
console.log('После очистки:', buyerModel.getData());

/*Проверка работы с классом AppsApi */
const api = new Api(API_URL);

const appApi = new AppApi(api);

try {
    const data = await appApi.getProducts();
    productsModel.setItems(data.items);
    console.log('Каталог:', productsModel.getItems());
} catch (err) {
    console.error('Ошибка загрузки товаров:', err);
}
