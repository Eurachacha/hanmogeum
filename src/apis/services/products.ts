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
  page?: number;
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

const getPage = (pageData: number) => {
  return `&page=${pageData}&limit=6`;
};

const productsApi = {
  getAllProducts: () => publicInstance.get<ResponseProductsList>("/products"),
  getProductById: (_id: number) => publicInstance.get<ResponseProductInfo>(`/products/${_id}`),
  getProductByIsNew: () => publicInstance.get<ResponseProductsList>(`/products?custom={"extra.isNew": true}`),
  getProductByIsBest: () => publicInstance.get<ResponseProductsList>(`/products?custom={"extra.isBest": true}`),

  searchProducts: ({ sort, filter, price, page }: RequestSearchProducts) => {
    const sortQueryString = sort ? getSortQueryString(sort) : "";
    const filterQueryString = filter ? getFilterQueryString(filter) : "";
    const priceString = price ? getPriceString(price) : "";
    const pageString = page ? getPage(page) : "";
    return publicInstance.get<ResponseProductsList>(
      `/products?${sortQueryString}${sortQueryString && filterQueryString ? "&" : ""}${filterQueryString}${
        filterQueryString && priceString ? "&" : ""
      }${priceString}${pageString}`,
    );
  },
};

export default productsApi;
