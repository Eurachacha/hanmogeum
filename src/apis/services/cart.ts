import {
  CartItemSummary,
  RequestAddItem,
  ResponseUpdateQuantity,
  ResponseCartItems,
  ResponseCartItemsWithCost,
  ResponseCheckStockStates,
} from "@/types/cart";
import { privateInstance, publicInstance } from "../instance";

const cartApi = {
  // GET /carts
  getAllItems: () => privateInstance.get<ResponseCartItemsWithCost>("/carts"),
  // POST /carts/local
  checkStockStates: (data: CartItemSummary[]) =>
    publicInstance.post<ResponseCheckStockStates>("/carts/local", { products: data }),
  // POST /carts
  addItem: (data: RequestAddItem) => privateInstance.post<ResponseCartItems>("/carts", data),
  // PATCH /carts/:_id
  updateQuantity: (_id: number, data: { quantity: number }) =>
    privateInstance.patch<ResponseUpdateQuantity>(`/carts/${_id}`, data),
  // PUT /carts/replace
  replaceCarts: (data: { products: CartItemSummary[] }) =>
    privateInstance.put<ResponseCartItems>("/carts/replace", data),
  // PUT /carts
  combineCarts: (data: { products: CartItemSummary[] }) => privateInstance.put<ResponseCartItems>("/carts", data),
  // DELETE /carts/_id
  deleteItem: (_id: number) => privateInstance.delete<{ ok: number }>(`/carts/${_id}`),
  // DELETE /carts/cleanup
  deleteAllItems: () => privateInstance.delete<{ ok: number }>("/carts/cleanup"),
};

export default cartApi;
