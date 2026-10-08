export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash' | '' ;

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

// Ответ GET /product/
export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

// Тело запроса POST /order/
export interface IOrderRequest extends IBuyer {
  total: number;
  items: string[];
}

// Ответ POST /order/
export interface IOrderResponse {
  id: string;
  total: number;
}
