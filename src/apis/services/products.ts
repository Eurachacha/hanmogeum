import { publicInstance } from "../instance";
import { ResponseProductsList, ResponseProductInfo } from "@/types/products";

const productsApi = {
  getAllProducts: () => publicInstance.get<ResponseProductsList>("/products"),
  getProductById: (_id: number) => publicInstance.get<ResponseProductInfo>(`/products/${_id}`),
};

export default productsApi;
