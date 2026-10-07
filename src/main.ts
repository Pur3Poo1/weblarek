import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { Products } from './components/Models/Products';


/*Проверка работы методов класса Products */
const productsModel = new Products();
productsModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', productsModel.getItems());

const firstProduct = productsModel.getItems()[0];
productsModel.setPreview(firstProduct);
console.log('Товар для подробного отображения:', productsModel.getPreview());

console.log('Товар по id:', productsModel.getItem(firstProduct.id));
