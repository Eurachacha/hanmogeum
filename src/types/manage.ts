import { Extra, MainImageType, ProductDetail } from "@/types/products";

// [[ PRODUCT MANAGE ]]

// Request Types
//
// POST /seller/products
export interface RequestProductCreate {
  price: number;
  show: boolean;
  active: boolean;
  name: string;
  mainImages: MainImageType[];
  content: string;
  extra: Extra;
}

// PATCH /seller/products/{_id}
export interface RequestProductUpdate {
  price: number;
  show: boolean;
  active: boolean;
  name: string;
  mainImages: MainImageType[];
  content: string;
  "extra.isNew": boolean;
}

// Response Types
//
// POST /seller/products
export interface ResponseProductCreate {
  ok: number;
  item: ProductDetail;
}

// PATCH /seller/products/{_id}
export interface UpdatedItem extends RequestProductUpdate {
  updatedAt: string;
}
export interface ResponseProductUpdate {
  ok: number;
  updated: UpdatedItem;
}

// DELETE /seller/products/{_id}
export interface ResponseProductDelete {
  ok: number;
  deleted: ProductDetail;
}

// [[ USER MANAGE ]]
