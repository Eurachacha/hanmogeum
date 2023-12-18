import { privateInstance } from "../instance";
import { ResponseDataMyOrderDetail, ResponseDataMyOrderList, getMyPageOrderListProps } from "@/types/myPage";

const myPageApi = {
  getMyPageOrderList: ({ state, createdAt }: getMyPageOrderListProps) => {
    const baseURL = "/orders?";
    const shippingCodeFilter = state ? `"state":"${state}"` : ``;
    const periodFilter = createdAt ? `"createdAt":{"$gte":"${createdAt.startDate}","$lt":"${createdAt.endDate}"}` : "";
    const resultURL =
      baseURL + (shippingCodeFilter || periodFilter ? `custom={${[shippingCodeFilter, periodFilter].join("")}}` : "");
    return privateInstance.get<ResponseDataMyOrderList>(resultURL);
  },
  getMyPageOrderDetail: (id: number | string) => privateInstance.get<ResponseDataMyOrderDetail>(`/orders/${id}`),
  patchMyPageOrderShippingCancel: (id: number | string) =>
    privateInstance.patch<ResponseDataMyOrderDetail>(`/orders/${id}`, { state: "OS100" }),
};
export default myPageApi;
