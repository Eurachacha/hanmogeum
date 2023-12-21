import { publicInstance } from "../instance";
import { ResponseProductsList, ResponseProductInfo } from "@/types/products";

export interface SortQueryObject {
  price?: number;
  createdAt?: number;
  buyQuantity?: number;
}

export interface FilterQueryObject {
  pack?: string[];
  taste?: string[];
  teaType?: string[];
  hashTag?: string[];
  isDecaf?: boolean;
}

interface PriceObject {
  maxPrice?: number;
}

interface RequestSearchProducts {
  sort?: SortQueryObject;
  filter?: FilterQueryObject;
  price?: PriceObject;
}

const getSortQueryString = (sortQueryObject: SortQueryObject) => {
  return `sort=${JSON.stringify(sortQueryObject)}`;
};

const getFilterQueryString = (filterQueryObject: FilterQueryObject) => {
  const arr = Object.entries(filterQueryObject);

  const object: {
    "extra.pack"?: string;
    "extra.isDecaf"?: boolean;
    "extra.teaType"?: { $in: string[] };
    "extra.hashTag"?: { $in: string[] };
    "extra.taste"?: { $in: string[] };
  } = {};

  arr.forEach((e: [string, string[] | boolean]) => {
    const [key, value] = e;
    if (key === "pack" && typeof value === "object") {
      object[`extra.${key}`] = value[0] as string;
    } else if (key === "isDecaf" && typeof value === "boolean") {
      object[`extra.${key}`] = value;
    } else if (key === "teaType" || key === "hashTag" || key === "taste") {
      object[`extra.${key}`] = {
        $in: value as string[],
      };
    }
  });

  return `custom=${JSON.stringify(object)}`;
};

const getPriceString = (priceObject: PriceObject) => {
  return `maxPrice=${priceObject}`;
};

const productsApi = {
  getAllProducts: () => publicInstance.get<ResponseProductsList>("/products"),
  getProductById: (_id: number) => publicInstance.get<ResponseProductInfo>(`/products/${_id}`),
  getProductByIsNew: () => publicInstance.get<ResponseProductsList>(`/products?custom={"extra.isNew": true}`),
  getProductByIsBest: () => publicInstance.get<ResponseProductsList>(`/products?custom={"extra.isBest": true}`),
  searchProducts: ({ sort, filter, price }: RequestSearchProducts) => {
    const sortQueryString = sort ? getSortQueryString(sort) : "";
    const filterQueryString = filter ? getFilterQueryString(filter) : "";
    const priceString = price ? getPriceString(price) : "";
    return publicInstance.get<ResponseProductsList>(
      `/products?${sortQueryString}${sortQueryString && filterQueryString ? "&" : ""}${filterQueryString}${
        filterQueryString && priceString ? "&" : ""
      }${priceString}`,
    );
  },
};

export default productsApi;
