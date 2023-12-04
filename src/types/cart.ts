export interface CartItemInfo {
  checked: boolean;
  product_id: number;
  price: number;
  shippingFees: number;
  name: string;
  mainImages: string[];
  stock: number;
  quantity: number;
}

export interface CartItemSummary {
  _id: number;
  quantity: number;
}

export interface CartItemDetail {
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  _id: number;
  product_id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: CartItemDetail;
}

// Request Types

export interface RequestCartItem {
  product_id: number;
  quantity: number;
}

// Reponse Types

export interface ResponseCartItems {
  ok: number;
  item: CartItem[];
}

export interface ResponseAddCartItem {
  ok: number;
  updated: {
    _id: number;
    quantity: number;
    updatedAt: string;
  };
}
