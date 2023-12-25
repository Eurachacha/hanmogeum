import { ProductReview } from "./reviews";

export interface MainImageType {
  url: string;
  fileName: string;
  orgName: string;
}

// Extra
export interface Extra {
  isNew: boolean;
  isBest: boolean;
  isDecaf: boolean;
  pack: string[];
  hashTag: string[];
  taste: string[];
  teaType: string[];
}

// Product
export interface Product {
  _id: number;
  seller_id: number;
  price: number;
  show: boolean;
  active: boolean;
  name: string;
  buyQuantity: number;
  quantity: number;
  mainImages: MainImageType[];
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
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ResponseProductsList {
  ok: number;
  item: Product[];
  pagination: Pagination;
}

export interface ResponseProductInfo {
  ok: number;
  item: ProductDetailWithReplies;
}
