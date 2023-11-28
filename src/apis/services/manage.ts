import { privateInstance } from "../instance";
import {
  RequestProductCreate,
  RequestProductUpdate,
  ResponseProductCreate,
  ResponseProductDelete,
  ResponseProductUpdate,
} from "@/types/manage";
import { ResponseProductsList, ResponseProductInfo } from "@/types/products";

const manageProductsApi = {
  // GET /seller/products
  getAllProducts: () => privateInstance.get<ResponseProductsList>("/seller/products"),
  // POST /seller/products
  createProduct: (data: RequestProductCreate) => privateInstance.post<ResponseProductCreate>("/seller/products", data),
  // GET /seller/products/{_id}
  getProductById: (_id: number) => privateInstance.get<ResponseProductInfo>(`/seller/products/${_id}`),
  // PATCH /seller/products/{_id}
  updateProduct: (_id: number, data: RequestProductUpdate) =>
    privateInstance.patch<ResponseProductUpdate>(`/seller/products/${_id}`, data),
  // DELETE /seller/products/{_id}
  deleteProduct: (_id: number) => privateInstance.delete<ResponseProductDelete>(`/seller/products/${_id}`),
};

export default manageProductsApi;
