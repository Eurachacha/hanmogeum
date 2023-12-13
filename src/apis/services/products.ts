import { publicInstance } from "../instance";
import { ResponseProductsList, ResponseProductInfo } from "@/types/products";

interface SortQueryObject {
  sortBy: "price" | "createdAt" | "buyQuantity"; // 어떤 기준으로 정렬할지
  sortOrder: 1 | -1; // 어떤 순서로 정렬할지
}

interface FilterQueryObject {
  pack?: string[];
  taste?: string[];
  teaType?: string[];
  hashTag?: string[];
  isDecaf?: boolean;
}

interface RequestSearchProducts {
  sort?: SortQueryObject;
  filter?: FilterQueryObject;
}

const getSortQueryString = (sortQueryObject: SortQueryObject) => {
  return `sort={"${sortQueryObject.sortBy}": ${sortQueryObject.sortOrder}}`;
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

const productsApi = {
  getAllProducts: () => publicInstance.get<ResponseProductsList>("/products"),
  getProductById: (_id: number) => publicInstance.get<ResponseProductInfo>(`/products/${_id}`),
  searchProducts: ({ sort, filter }: RequestSearchProducts) => {
    const sortQueryString = sort ? getSortQueryString(sort) : "";
    const filterQueryString = filter ? getFilterQueryString(filter) : "";
    return publicInstance.get<ResponseProductsList>(
      `/products?${sortQueryString}${sortQueryString && filterQueryString ? "&" : ""}${filterQueryString}`,
    );
  },
};

export default productsApi;
