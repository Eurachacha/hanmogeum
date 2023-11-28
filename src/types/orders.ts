// POST /orders 상품 구매
export interface RequestOrders {
  products: OrderProduct[];
  address: OrderAddress;
}

interface OrderProduct {
  _id: number;
  count: number;
}

interface OrderAddress {
  name: string;
  value: string;
}

export interface ResponseOrders {
  ok: number;
  item: OrderItem;
}

interface OrderItem extends RequestOrders {
  user_id: number;
  _id: number;
  createdAt: string;
  cost: OrderCost;
}

interface OrderCost {
  products: number;
  shippingFees: number;
  total: number;
}

interface OrderProduct {
  _id: number;
  quantity: number;
  name: string;
  image: string;
  price: number;
}

// GET /orders 구매 목록 조회
export interface ResponseOrderList {
  ok: number;
  item: OrderItem[];
}
