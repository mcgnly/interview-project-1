type ISO8601DateTime = string;

export interface Product {
  id: string|number;
  imageSrc: string;
  name: string;
  priceCents: number;
  createdAt?: ISO8601DateTime;
  updatedAt?: ISO8601DateTime;
}
export interface CartItem {
    cart?: Cart
    id: string|number
    product: Product
    quantity: number
}

export interface Cart {
    cartItems: [CartItem]
    createdAt?: ISO8601DateTime
    id: string|number
    updatedAt?: ISO8601DateTime
}
