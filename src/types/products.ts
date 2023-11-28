import { ProductReview } from "./reviews";

// Extra
export interface Extra {
  isNew: boolean;
  isBest: boolean;
  category: string[];
  quantity: number;
  buyQuantity: number;
  order: number;
}

// Product
export interface Product {
  _id: number;
  seller_id: number;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  name: string;
  mainImages: string[];
  createdAt: string;
  updatedAt: string;
  extra: Extra;
}

export interface ProductDetail extends Product {
  content?: string;
}

export interface ProductDetailWithReplies extends ProductDetail {
  replices: ProductReview[];
}

// Reponse Types

export interface ResponseProductsList {
  ok: number;
  item: Product[];
}

export interface ResponseProductInfo {
  ok: number;
  item: ProductDetailWithReplies;
}
