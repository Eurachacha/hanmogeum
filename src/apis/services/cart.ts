import { CartItemSummary, RequestCartItem, ResponseAddCartItem, ResponseCartItems } from "@/types/cart";
import { privateInstance } from "../instance";

const cartApi = {
  // GET /carts
  getAllItems: () => privateInstance.get<ResponseCartItems>("/carts"),
  // POST /carts
  addItem: (data: RequestCartItem) => privateInstance.post<ResponseCartItems>("/carts", data),
  // PATCH /carts/:_id
  updateQuantity: (_id: number, data: { quantity: number }) =>
    privateInstance.patch<ResponseAddCartItem>(`/carts/${_id}`, data),
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
