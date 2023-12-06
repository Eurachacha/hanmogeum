import { OrderCost } from "./orders";

export interface CartItemSummary {
  _id: number; // cartItem id
  quantity: number; // 수량
}

export interface CartItemDetail {
  _id: number;
  name: string;
  price: number;
  seller_id: number;
  quantity: number;
  buyQuantity: number;
  image: string;
}

export interface CartItem {
  _id: number; // cartItem id
  product_id: number; // 상품 id
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: CartItemDetail;
}

// Request Types
// 장바구니에 상품 추가 요청 POST /carts
export interface RequestAddItem {
  product_id: number;
  quantity: number;
}

// Reponse Types

export interface ResponseCartItems {
  ok: number;
  item: CartItem[];
}

export interface ResponseCartItemsWithCost extends ResponseCartItems {
  cost: OrderCost;
}

export interface ResponseUpdateQuantity {
  ok: number;
  updated: {
    _id: number;
    quantity: number;
    updatedAt: string;
  };
}
