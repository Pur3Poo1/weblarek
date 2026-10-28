# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.


### Типы данных

#### Тип TPayment
Тип описывающий способ оплаты 

#### Тип IProduct
Тип описывающий товар

Поля
`id: string` — уникальный идентификатор товара
`description: string` — описание товара
`image: string` — путь к изображению товара
`title: string` — название товара
`category: string` — категория товара
`price: number | null` — цена товара

#### Тип IBuyer
Тип описывающий покупателя

Поля
`payment: TPayment` — выбранный способ оплаты
`email: string` — электронная почта покупателя
`phone: string` — телефон покупателя
`address: string` — адрес доставки

#### Тип IProductsResponse
Тип описывающий ответ сервера на GET /product/

Поля
`total: number` — общее количество товаров
`items: IProduct[]` — массив товаров

#### Тип IOrderRequest
Тип описывающий ответ сервера на POST /order/

Поля 
`payment, email, phone, address` — наследуются от IBuyer
`total: number` — итоговая стоимость заказа
`items: string[]` — массив идентификаторов товаров, которые входят в заказ

#### Тип IOrderResponse
Тип описывающий ответ сервера на POST /order/

Поля
`id: string` — идентификатор оформленного заказа
`total: number` — итоговая сумма заказа

#### Тип IBasketData
Тип описывающий данные для корзины в модальном окне

Поля:
items: HTMLElement[] — массив готовых DOM-элементов карточек товаров в корзине
total: number — итоговая стоимость товаров в корзине
canOrder: boolean — доступность кнопки оформления заказа

#### Тип IGalleryData
Тип описывающий данные для контейнера каталога на главной странице

Поля:
catalog: HTMLElement[] — массив готовых DOM-элементов карточек товаров

#### Тип IHeader
Тип описывающий данные для шапки сайта

Поля:
counter: number — количество товаров в корзине

#### Тип IModalData
Тип описывающий данные для модального окна

Поля:
content: HTMLElement — DOM-элемент, который вставляется в контейнер модального окна

### Слой Модели

#### Класс Products
Хранит каталог товаров и товар выбранный для подробного отображения

Конструктор:
constructor(protected events: IEvents) - принимает брокер событий для уведомления об изменениях

Поля класса:  
`private items: IProduct[] = []` - массив всех товаров каталога
`private preview: IProduct | null = null` - товар, выбранный для подробного отображения

Методы класса:  
`setItems(items: IProduct[]): void` - сохраняет массив товаров каталога и эмитит событие products:changed
`getItems(): IProduct[]` - возвращает массив товаров
`getItem(id: string): IProduct | undefined` - возвращает товар по его id
`setPreview(item: IProduct): void` - сохраняет товар для подробного отображения и эмитит событие preview:changed
`getPreview(): IProduct | null` - возвращает товар для подробного отображения


#### Класс Cart
Хранит массив товаров, выбранных покупателем для покупки

Конструктор:
constructor(protected events: IEvents) - принимает брокер событий для уведомления об изменениях

Поля класса:  
`private items: IProduct[] = []` - массив товаров в корзине

Методы класса:  
`getItems(): IProduct[]` - возвращает массив товаров находящихся в корзине
`addItem(item: IProduct): void` - добавляет товар в корзину и эмитит событие basket:changed
`removeItem(item: IProduct): void` - удаляет товар полученный в параметре из корзины и эмитит событие basket:changed
`clear(): void` - очищает корзину товаров и эмитит событие basket:changed
`getTotalPrice(): number` - возвращает стоимость всех товаров в корзине  
`getCount(): number` - возвращает количество товаров в корзине 
`hasItem(id: string): boolean` -  проверяет наличие товара в корзине по его id

#### Класс Buyer
Хранит данные о покупателе

Конструктор:
constructor(protected events: IEvents) - принимает брокер событий для уведомления об изменениях

Поля класса:  
`private data: IBuyer` - массив данных о покупателе

Методы класса:  
`setData(data: Partial<IBuyer>): void ` - сохраняет и дозаписывает данные о покупателе и эмитит событие buyer:changed
`getData(): IBuyer` - возвращает массив данных о покупателе
`clear(): void` - очищает массив данных о покупателе и эмитит событие buyer:changed
`validate(): TBuyerErrors`  - валидирует данные о покупателе, возвращает объект с ошибками

### Слой Представление

#### Класс Basket
Конструктор:
constructor(protected events: IEvents, container: HTMLElement) - принимает брокер событий и DOM-элемент корзины

Поля класса:  
protected listElement: HTMLElement - список товаров в корзине
protected priceElement: HTMLElement - элемент с итоговой стоимостью товаров в корзине
protected orderButton: HTMLButtonElement - кнопка оформления заказа

Методы класса:  
set items(value: HTMLElement[]) - принимает массив готовых DOM-элементов карточек
set total(value: number) - устанавливает итоговую стоимость товаров в корзине
set canOrder(value: boolean) - управляет доступностью кнопки оформления заказа

#### Класс Gallery
Конструктор:
constructor(container: HTMLElement) - принимает DOM-элемент контейнера каталога

Методы класса:  
set catalog(items: HTMLElement[]) - принимает массив DOM-элементов карточек товаров и вставляетт их в контейнер
#### Класс Header
Конструктор:
constructor(protected events: IEvents, container: HTMLElement) - принимает брокер событий и DOM-элемент

Поля класса:  
protected basketButton: HTMLButtonElement - кнопка открытия корзины
protected counterElement: HTMLElement - счетчик количества ттоваров

Методы класса:  
set counter(value:number) - возвращаетт количество товаров 
#### Класс Modal
Конструктор:
constructor(protected events: IEvents, container: HTMLElement) - принимает брокер событий и DOM-элемент модального окна

Поля класса:  
protected closeButton: HTMLButtonElement - кнопка закрытия модально окна
protected contentElement: HTMLElement - контейнер для вставляемого контента 

Методы класса:  
set content(value:HTMLElement) - вставляет переданный DOM-элемент в контейнер содального окна
open(): void - открывает модальное окно 
close(): void - закрывает модальное окно

#### Класс Card
Конструктор: 
constructor(container: HTMLElement) - принимает DOM-элемент карточки

Поля класса:  
protected titleElement: HTMLElement - элемент с названием товара
protected priceElement: HTMLElement - элемент с ценой товара

Методы класса:  
set id(value: string) - сохраняет идентификатор товара в dataset контейнера 
set title(value: string) - устанавливает название товара 
set price(value: number | null) - устанавливает цену товара 

#### Класс CardBasket
Конструктор:
constructor(protected events: IEvents, container: HTMLElement) - принимает брокер событий и DOM-элемент карточки

Поля класса:  
protected indexElement: HTMLElement - порядковый номер товара в корзине 
protected deleteButton: HTMLButtonElement - кнопк удаления товара 

Методы класса:  
set index(value: number) - устанавливает порядковый номер товара в корзине 

#### Класс CardCatalog
Конструктор:
constructor(protected events: IEvents, container: HTMLElement) - принимает брокер событий и DOM-элемент карточки

Поля класса:  
protected imageElement: HTMLImageElement - изображение товара 
protected categoryElement: HTMLElement - категория товара 

Методы класса:
set image(value: string) - устанавливает изображение товара 
set category(value: string) - устанавливает категорию товара и добавляет соответствующий модификатор

#### Класс CardPreview
Конструктор:
constructor(protected events: IEvents, container: HTMLElement) - принимает брокер событий и DOM-элемент карточки

Поля класса:  
protected imageElement: HTMLImageElement - изображение товара
protected categoryElement: HTMLElement - категория товара
protected descriptionElement: HTMLElement - описание товара
protected buttonElement: HTMLButtonElement - кнопка добавления/удаления в/из корзины 

Методы класса:  
set image(value: string) - устанавливает изображение товара
set category(value: string) -  устанавливает категорию товара и добавляет соответствующий модификатор
set description(value: string) - устанавливает описание товара
set inBasket(value: boolean) - переключает текст кнопки в зависимости от того, находится ли товар в корзине
set price(value: number | null) - устанавливает цену и блокирует кнопку, если цена null

#### Класс Form
Конструктор:
constructor(protected events: IEvents, container: HTMLFormElement) - принимает брокер событий и DOM-элемент формы

Поля класса:  
protected submitButton: HTMLButtonElement - кнопка отправки формы
protected errorsElement: HTMLElement - блок с текстом ошибок

Методы класса:  
set errors(value: string) - устанавливает текст ошибок формы
set canSubmit(value: boolean) - управляет доступностью кнопки отправки

#### Класс FormContacts
Конструктор:
constructor(protected events: IEvents, container: HTMLFormElement) - принимает брокер событий и DOM-элемент формы

Поля класса:  
protected emailInput: HTMLInputElement - поле ввода email
protected phoneInput: HTMLInputElement - поле ввода телефона

Методы класса:  
set email(value: string) - устанавливает значение поля email
set email(value: string) - устанавливает значение поля телефона

#### Класс FormOrder
Конструктор:
constructor(protected events: IEvents, container: HTMLFormElement) - принимает брокер событий и DOM-элемент формы

Поля класса:  
protected cardButton: HTMLButtonElement - кнопка оплаты "онлайн"
protected cashButton: HTMLButtonElement - кнопка оплаты "при получении"
protected addressInput: HTMLInputElement - поле ввода адреса

Методы класса:  
set payment(value: TPayment | '') - выделяет активную кнопку оплаты модификатором
set address(value: string) - устанавливает значение поля адреса

#### Класс FOrmSuccess
Конструктор:
constructor(protected events: IEvents, container: HTMLElement) - принимает брокер событий и DOM-элемент

Поля класса:  
protected descriptionElement: HTMLElement - блок с описанием списанной суммы
protected closeButton: HTMLButtonElement - кнопка закрытия

Методы класса:  
set total(value: number) - устанавливает итоговую сумму заказа

### События

#### События моделей данных
products:changed — изменился массив товаров каталога (Products.setItems)
preview:changed — изменился товар, выбранный для подробного отображения (Products.setPreview)
basket:changed — изменилось содержимое корзины (Cart.addItem, Cart.removeItem, Cart.clear)
buyer:changed — изменились данные покупателя (Buyer.setData, Buyer.clear)

#### События События представлений
card:select — выбрана карточка товара в каталоге для подробного просмотра (CardCatalog)
card:action — нажата кнопка добавления в корзину или удаления из неё в подробной карточке (CardPreview)
basket:open — нажата кнопка открытия корзины в шапке сайта (Header)
basket:remove — нажата кнопка удаления товара из корзины (CardBasket)
order:start — нажата кнопка «Оформить» в корзине (Basket)
order:change — изменено поле в первой форме оформления заказа (FormOrder)
contacts:change — изменено поле во второй форме оформления заказа (FormContacts)
order:submit — отправлена первая форма оформления заказа (FormOrder)
contacts:submit — отправлена вторая форма оформления заказа (FormContacts)
success:close — нажата кнопка закрытия экрана успешного заказа (FormSuccess)
modal:close — закрыто модальное окно кликом по крестику или подложке (Modal)

### Слой коммуникации

#### Класс AppApi
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(api: IApi)` - объект через который выполняются запросы на сервер

Поля класса:  
`private api: IApi` - объект http клиента, через который выполняются запросы get и post 

Методы:  
`getProducts(): Promise<IProductsResponse>` - выполняет GET запрос на эндпоинт "/product/" и возвращает промис с объектом, в котором находится массив товаров
`createOrder(data: IOrderRequest): Promise<IOrderResponse>` - выполняет POST запрос на эндпоинт "/order/" и передает в теле запроса данные, возвращает промис с объектом, подтверждающим покупку

### Презентер
Презентер — слой, который связывает модели данных и представления. Он подписывается на события моделей и представлений и реагирует на них: вызывает методы моделей, обновляет представления и управляет модальным окном.

Так как приложение одностраничное, презентер реализован в основном скрипте приложения и не вынесен в  отдельный класс

#### Обрабатываемые события

products:changed - Собирает карточки CardCatalog и передаёт их в Gallery
preview:changed - Заполняет CardPreview и открывает модальное окно
basket:changed - Обновляет счётчик в Header; если корзина открыта — перерисовывает её
buyer:changed - Обновляет состояние открытой формы: активную кнопку оплаты, доступность кнопки отправки и текст ошибок
card:select - Находит товар по id и сохраняет его в модель как preview
card:action - Добавляет товар в корзину или удаляет из неё, закрывает модальное окно
basket:open - Собирает Basket и открывает модальное окно
basket:remove - Удаляет товар из модели корзины
order:start - Заполняет FormOrder начальными значениями и открывает модальное окно
order:change - Сохраняет изменённое поле в модель покупателя
contacts:change - Сохраняет изменённое поле в модель покупателя
order:submit - Заполняет FormContacts и показывает её в модальном окне
contacts:submit - Отправляет заказ на сервер, очищает корзину и данные покупателя, показывает FormSuccess
success:close - Закрывает модальное окно
modal:close - Закрывает модальное окно