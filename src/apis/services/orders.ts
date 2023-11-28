import { privateInstance } from "../instance";
import { RequestOrders, ResponseOrders, ResponseOrderList } from "@/types/orders";

const ordersApi = {
  // POST/orders
  postOrder: (data: RequestOrders) => privateInstance.post<ResponseOrders>("/orders", data),
  // GET/orders
  getOrderList: () => privateInstance.get<ResponseOrderList>("/orders"),
};

export default ordersApi;
