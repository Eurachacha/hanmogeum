import { OrderCost } from "./orders";

export interface CartItemSummary {
  _id: number;
  quantity: number; // 수량
}

export interface CartItemDetail {
  _id: number; // === product_id
  name: string;
  price: number;
  seller_id: number;
  quantity: number;
  buyQuantity: number;
  image: string;
}

export interface CartItem {
  _id: number; // cartItem _id
  product_id: number; // 상품 id
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: CartItemDetail;
}

// 로컬 장바구니 아이템 타입
export interface CartStorageItem {
  quantity: number;
  product: {
    _id: number;
    name: string;
    image: string;
    price: number;
  };
  stock: number;
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
