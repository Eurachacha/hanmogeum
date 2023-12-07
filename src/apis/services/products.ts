import { publicInstance } from "../instance";
import { ResponseProductsList, ResponseProductInfo } from "@/types/products";

interface SortQueryObject {
  sortBy: "price" | "createdAt" | "buyQuantity"; // 어떤 기준으로 정렬할지
  sortOrder: 1 | -1; // 어떤 순서로 정렬할지
}

interface FilterQueryObject {
  pack?: string;
  taste?: string[];
  teaType?: string[];
  hashTag?: string[];
  isDecaf: boolean;
}

interface RequestSearchProducts {
  sort?: SortQueryObject;
  filter?: FilterQueryObject;
}

const getSortQueryString = (sortQueryObject: SortQueryObject) => {
  return `sort={"${sortQueryObject.sortBy}": ${sortQueryObject.sortOrder}}`;
};

const getFilterQueryString = (filterQueryObject: FilterQueryObject) => {
  const str: string[] = [];
  const arr = Object.entries(filterQueryObject);
  arr.forEach((e) => {
    const [key, value] = e;

    if (typeof value === "object") {
      // 배열인 경우
      const valueArr = value.map((el: string) => `"extra.${key}": "${el}"`);
      str.push(...valueArr);
    } else if (typeof value === "boolean") {
      // 불리언인 경우
      str.push(`"extra.${key}": ${value}`);
    } else {
      // 배열도 불리언도 아닌 경우
      str.push(`"extra.${key}": "${value}"`);
    }
  });
  return `extra={${str.join(", ")}}`;
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
