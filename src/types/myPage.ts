export interface ResponseDataMyOrderList {
  ok: number;
  item: MyOrderItem[] | [];
}

export interface MyOrderItem {
  _id: number;
  user_id: number;
  state: string;
  products: Product[];
  cost: Cost;
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: number;
  seller_id: number;
  state: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  reply_id: number;
  delivery: Delivery;
  reply: Reply;
}

export interface Delivery {
  company: string;
  trackingNumber: string;
  url: string;
}
export interface Reply {
  rating: number;
  content: string;
  createdAt: string;
}

export interface Cost {
  products: number;
  shippingFees: number;
  discount: Discount;
  total: number;
}

export interface Discount {
  products: number;
  shippingFees: number;
}

export interface Address {
  name: string;
  value: string;
}
