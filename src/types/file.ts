import { Extra } from "@/types/products";

export interface ResponseAttachFile {
  ok: number;
  file: { originalname: string; name: string; path: string };
}

export interface ProductParams {
  id: number;
  price: number;
  show: boolean;
  active: boolean;
  name: string;
  quantity: number;
  buyQuantity: number;
  extra: Extra;
  content: string;
  mainImages: [
    {
      rawFile: File;
      src?: string;
      title?: string;
    },
  ];
}
