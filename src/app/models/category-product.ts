export interface Product {
    name: string;
    category: string;
    description: string;
    price: number;
    id: number;
    categoryId: number;
}

export interface Category {
    name: string;
    products: Product[];
    id?: number;
}

export interface OrderUser {
    name: string;
    surname: string;
    email: string;
    address: string;
}

export interface OrderProduct {
    product: Product;
    quantity: number;
}

export interface Order {
    user: OrderUser;
    orderProducts: OrderProduct[];
    date: Date;
    id?: number;
}