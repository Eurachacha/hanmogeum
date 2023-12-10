interface OrderProduct {
  _id: number;
  quantity: number;
}

interface OrderAddress {
  name: string;
  value: string;
}

interface OrderProductDetail extends OrderProduct {
  name: string;
  image: string;
  price: number;
}

interface Discount {
  products: number;
  shippingFees: number;
}

export interface OrderCost {
  products: number;
  shippingFees: number;
  discount: Discount;
  total: number;
}

interface OrderDetail {
  products: OrderProductDetail[];
  address: OrderAddress;
  state: string;
  user_id: number;
  _id: number;
  createdAt: string;
  updatedAt: string;
  cost: OrderCost;
}

// Request Types

// POST /orders dryRun 재고 체크
export interface RequestCheckStocks {
  products: OrderProduct[];
}

// POST /orders 구매 목록 조회
export interface RequestCreateOrder {
  products: OrderProduct[];
  address: OrderAddress;
}

// Response Types

// POST /orders 구매 목록 조회
export interface ResponseCreateOrder {
  ok: number;
  item: OrderDetail;
}

// GET /orders 구매 목록 조회
export interface ResponseGetOrderList {
  ok: number;
  item: OrderDetail[];
}
