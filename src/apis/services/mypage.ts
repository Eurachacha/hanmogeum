import ORDER_STATE from "@/constants/code";
import { privateInstance } from "../instance";
import { ResponseDataMyOrderDetail, ResponseDataMyOrderList, getMyPageOrderListProps } from "@/types/myPage";

const myPageApi = {
  getMyPageOrderList: ({ state, createdAt, pagination }: getMyPageOrderListProps) => {
    const baseURL = "/orders?";
    const shippingCodeFilter = state ? `"state":"${state}"` : ``;
    const periodFilter = createdAt ? `"createdAt":{"$gte":"${createdAt.startDate}","$lt":"${createdAt.endDate}"}` : "";
    const paginationFilter = pagination ? `&page=${pagination.page}&limit=${pagination.limit}` : "";
    const sortByDesc = `&sort={"createdAt": -1}`;
    const resultURL =
      baseURL +
      (shippingCodeFilter || periodFilter ? `custom={${[shippingCodeFilter, periodFilter].join("")}}` : "") +
      paginationFilter +
      sortByDesc;
    return privateInstance.get<ResponseDataMyOrderList>(resultURL);
  },
  getMyPageOrderDetail: (id: number | string) => privateInstance.get<ResponseDataMyOrderDetail>(`/orders/${id}`),
  patchMyPageOrderShippingCancel: (id: number | string) =>
    privateInstance.patch<ResponseDataMyOrderDetail>(`/orders/${id}`, { state: ORDER_STATE.SHIPPING_CANCEL.CODE }),
};
export default myPageApi;
