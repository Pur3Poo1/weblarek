import { IApi, IOrderRequest, IProductsResponse, IOrderResponse } from "../../types";

export class AppApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    // GET /product/ — получить каталог товаров
    async getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product/');
    }

    // POST /order/ — отправить заказ
    async createOrder(data: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order/', data);
    }

}