import { privateInstance } from "../instance";
import { RequestCreateOrder, ResponseCreateOrder, ResponseGetOrderList } from "@/types/orders";

const ordersApi = {
  // POST /orders
  createOrder: (data: { product: RequestCreateOrder[] }) => privateInstance.post<ResponseCreateOrder>("/orders", data),
  // GET /orders
  getOrderList: () => privateInstance.get<ResponseGetOrderList>("/orders"),
};

export default ordersApi;
