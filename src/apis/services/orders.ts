import ORDER_STATE from "@/constants/code";
import { privateInstance, publicInstance } from "../instance";
import { RequestCheckStocks, RequestCreateOrder, ResponseCreateOrder, ResponseGetOrderList } from "@/types/orders";

const ordersApi = {
  // POST /orders dryRun
  checkStocks: (data: RequestCheckStocks) =>
    publicInstance.post<ResponseCreateOrder>("/orders", { ...data, dryRun: true }),
  // POST /orders
  createOrder: (data: RequestCreateOrder) =>
    privateInstance.post<ResponseCreateOrder>("/orders", { ...data, state: ORDER_STATE.SHIPPING_PREPARING.CODE }),
  // GET /orders
  getOrderList: () => privateInstance.get<ResponseGetOrderList>("/orders"),
};

export default ordersApi;
