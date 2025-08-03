
export interface User{
    email: string,
    password: string,
}

export interface Product {
    id: number;
    name: string;
    description: string;
    brand: string;
    gender: string;
    category: string;
    size: number[];
    color: string[];
    price: number;
    is_in_inventory: boolean;
    items_left: number;
    imageURL: string;
    slug: string;
    discountPrice?: undefined;
    isCart?: boolean;
    cartQuantity?: number;
    isFavriot?: boolean;
    [key: string]: string | number | boolean | object | any[] | undefined;

}
