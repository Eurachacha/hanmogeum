import { privateInstance } from "../instance";
import { ResponseDataMyOrderList } from "@/types/myPage";

const myPageApi = {
  getMyPageOrderList: () => privateInstance.get<ResponseDataMyOrderList>(`/orders`),
};

export default myPageApi;
