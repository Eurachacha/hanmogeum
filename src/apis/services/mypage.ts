import { privateInstance } from "../instance";
import { ResponseDataMyOrderList } from "@/types/myPage";

const myPageApi = {
  getMyPageOrderList: () => privateInstance.get<ResponseDataMyOrderList>(`/orders`),
  getMyPageOrderByShippingCode: (state: string) =>
    privateInstance.get<ResponseDataMyOrderList>(`/orders?custom={"state":"${state}"}`),
};

export default myPageApi;
