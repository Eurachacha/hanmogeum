import ORDER_STATE from "@/constants/code";
import { privateInstance } from "../instance";
import { ResponseDataMyOrderDetail, ResponseDataMyOrderList, getMyPageOrderListProps } from "@/types/myPage";

const myPageApi = {
  getMyPageOrderList: ({ state, createdAt }: getMyPageOrderListProps) => {
    const baseURL = "/orders?";
    const filterList = [];
    if (state) filterList.push(`"state":"${state}"`);
    if (createdAt) filterList.push(`"createdAt":{"$gte":"${createdAt.startDate}","$lt":"${createdAt.endDate}"}`);

    const resultURL = baseURL + (filterList.length ? `custom={${filterList.join(",")}}` : "");
    return privateInstance.get<ResponseDataMyOrderList>(resultURL);
  },
  getMyPageOrderDetail: (id: number | string) => privateInstance.get<ResponseDataMyOrderDetail>(`/orders/${id}`),
  patchMyPageOrderShippingCancel: (id: number | string) =>
    privateInstance.patch<ResponseDataMyOrderDetail>(`/orders/${id}`, { state: ORDER_STATE.SHIPPING_CANCEL.CODE }),
};
export default myPageApi;
