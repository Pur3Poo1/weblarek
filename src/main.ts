import './scss/styles.scss';

// Models
import { Products } from './components/Models/Products';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { AppApi } from './components/Models/AppApi';

import { EventEmitter } from './components/base/Events';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { cloneTemplate, ensureElement } from './utils/utils';

// View
import { Header } from './components/Views/Header';
import { Gallery } from './components/Views/Gallery';
import { CardCatalog } from './components/Views/Card/CardCatalog';
import { CardPreview } from './components/Views/Card/CardPreview';
import { CardBasket } from './components/Views/Card/CardBasket';
import { Modal } from './components/Views/Modal';
import { Basket as BasketView } from './components/Views/Basket';
import { Order } from './components/Views/Form/FormOrder';
import { Contacts } from './components/Views/Form/FormContacts';
import { Success } from './components/Views/Form/FormSuccess';

import { IBuyer } from './types';

// Шаблоны 
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Брокер событий, API, модели 
const events = new EventEmitter();

// API
const api = new Api(API_URL);
const appApi = new AppApi(api);

// Модели 
const productsModel = new Products(events);
const basketModel = new Cart(events);
const buyerModel = new Buyer(events);

// ---------- Корневые контейнеры ----------
const headerContainer = ensureElement<HTMLElement>('.header');
const galleryContainer = ensureElement<HTMLElement>('.gallery');
const modalContainer = ensureElement<HTMLElement>('#modal-container');

// Корневые компоненты
const header = new Header(events, headerContainer);
const gallery = new Gallery(galleryContainer);
const modal = new Modal(events, modalContainer);

// Модальные компоненты
const cardPreview = new CardPreview(events, cloneTemplate(cardPreviewTemplate));
const basketView = new BasketView(events, cloneTemplate(basketTemplate));
const orderForm = new Order(events, cloneTemplate<HTMLFormElement>(orderTemplate));
const contactsForm = new Contacts(events, cloneTemplate<HTMLFormElement>(contactsTemplate));
const success = new Success(events, cloneTemplate(successTemplate));

// Получение каталога товаров
appApi
    .getProducts()
    .then((data) => {
        productsModel.setItems(data.items);
    })
    .catch((err) => console.error('Ошибка загрузки товаров:', err));



// Описание события измения каталога
events.on('products:changed', () => {
    const cards = productsModel.getItems().map((product) => {
        const card = new CardCatalog(events, cloneTemplate(cardCatalogTemplate));
        card.id = product.id;
        card.title = product.title;
        card.price = product.price;
        card.category = product.category;
        card.image = product.image;
        return card.render();
    });

    gallery.catalog = cards;
});

// Описание события измения корзины
events.on('basket:changed', () => {
    // Счетчик
    header.counter = basketModel.getCount();
    // Содержимое корзины
    if (modalContainer.querySelector('.basket')) {
        renderBasket();
    }
});

// Описание события измения подробной карточки товара
events.on('preview:changed', () => {
    const product = productsModel.getPreview();
    if (!product) return;

    cardPreview.id = product.id;
    cardPreview.title = product.title;
    cardPreview.price = product.price;
    cardPreview.category = product.category;
    cardPreview.image = product.image;
    cardPreview.description = product.description;
    cardPreview.inBasket = basketModel.hasItem(product.id);

    modal.content = cardPreview.render();
    modal.open();
});

// Описание события измения данных о покупателе
events.on('buyer:changed', () => {
    const errors = buyerModel.validate();
    const buyer = buyerModel.getData();

    if (modalContainer.querySelector('form[name="order"]')) {
        // активный способ оплаты
        orderForm.payment = buyer.payment; 
        orderForm.canSubmit = !errors.payment && !errors.address;
        orderForm.errors = [errors.payment, errors.address].filter(Boolean).join('. ');
    }

    if (modalContainer.querySelector('form[name="contacts"]')) {
        contactsForm.canSubmit = !errors.email && !errors.phone;
        contactsForm.errors = [errors.email, errors.phone].filter(Boolean).join('. ');
    }
});


// Описание события когда выбрана карточка в каталоге
events.on('card:select', (data: { id: string }) => {
    const product = productsModel.getItem(data.id);
    if (product) {
        productsModel.setPreview(product);
    }
});

// Описание события нажатия кнопки "добавить/удалить товар"
events.on('card:action', (data: { id: string }) => {
    const product = productsModel.getItem(data.id);
    if (!product) return;

    if (basketModel.hasItem(product.id)) {
        basketModel.removeItem(product);
    } else {
        basketModel.addItem(product);
    }

    modal.close();
});

// Описание события открытия корзины товаров
events.on('basket:open', () => {
    renderBasket();
    modal.open();
});

// Описание события удаления товара из корзины товаров
events.on('basket:remove', (data: { id: string }) => {
    const product = productsModel.getItem(data.id);
    if (product) {
        basketModel.removeItem(product);
    }
});

// Описание события открыия формы оформления заказа
events.on('order:start', () => {
    const buyer = buyerModel.getData();

    orderForm.payment = buyer.payment;
    orderForm.address = buyer.address;
    orderForm.errors = '';
    orderForm.canSubmit = false;

    modal.content = orderForm.render();
    modal.open();
});

// Описание события изменений на форме заказа
events.on('order:change', (data: { field: keyof IBuyer; value: string }) => {
    buyerModel.setData({ [data.field]: data.value });
});

// Описание события изменений на форме контактов
events.on('contacts:change', (data: { field: keyof IBuyer; value: string }) => {
    buyerModel.setData({ [data.field]: data.value });
});

// Описание события отправки первой формы
events.on('order:submit', () => {
    const buyer = buyerModel.getData();

    contactsForm.email = buyer.email;
    contactsForm.phone = buyer.phone;
    contactsForm.errors = '';
    contactsForm.canSubmit = false;

    modal.content = contactsForm.render();
});

// Описание события отправки второй формы
events.on('contacts:submit', () => {
    const buyer = buyerModel.getData();
    const basket = basketModel.getItems();

    const orderData = {
        ...buyer,
        total: basketModel.getTotalPrice(),
        items: basket.map((p) => p.id),
    };

    appApi
        .createOrder(orderData)
        .then((response) => {
            basketModel.clear();
            buyerModel.clear();

            success.total = response.total;
            modal.content = success.render();
        })
        .catch((err) => console.error('Ошибка оформления заказа:', err));
});

// Описание события закрытия модального окна с формой подтверждения
events.on('success:close', () => {
    modal.close();
});

// Описание события закрытия модального окна
events.on('modal:close', () => {
    modal.close();
});

// Создание карточек товаров для корзины товаров
function createBasketCards(): HTMLElement[] {
    return basketModel.getItems().map((product, index) => {
        const card = new CardBasket(events, cloneTemplate(cardBasketTemplate));
        card.id = product.id;
        card.title = product.title;
        card.price = product.price;
        card.index = index + 1;
        return card.render();
    });
}

// Отрисовка корзины товаров
function renderBasket(): void {
    const items = basketModel.getItems();

    basketView.items = createBasketCards();
    basketView.total = basketModel.getTotalPrice();
    basketView.canOrder = items.length > 0;

    modal.content = basketView.render();
}