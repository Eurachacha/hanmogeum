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
