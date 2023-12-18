import { MainImageType, ProductDetailWithReplies } from "./products";

interface OrderProduct {
  _id: number;
  quantity: number;
}

interface OrderAddress {
  name?: string;
  value: string;
  detailValue?: string;
}

export interface OrderProductDetail extends OrderProduct {
  name: string;
  image: MainImageType;
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

export interface OrderDetail {
  products: OrderProductDetail[];
  state: string;
  user_id: number;
  _id: number;
  createdAt: string;
  updatedAt: string;
  shippingInfo: ShippingInfoType;
  cost: OrderCost;
}

export interface ShippingInfoType {
  name?: string;
  phone: string;
  address: OrderAddress;
}

export interface OrderFromDetailPage extends ProductDetailWithReplies {
  quantityInput: number;
}

// Request Types

// POST /orders dryRun 재고 체크
export interface RequestCheckStocks {
  products: OrderProduct[];
}

// POST /orders 구매 목록 조회
export interface RequestCreateOrder {
  products: OrderProduct[];
  shippingInfo: ShippingInfoType;
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
