import { List, Datagrid, TextField, FunctionField, DateField } from "react-admin";
import { useRecoilValue } from "recoil";
import { nestedCodeState } from "@/recoil/atoms/codeState";
import { OrderDetail } from "@/types/orders";
import getPriceFormat from "@/utils/getPriceFormat";

const getStateString = (
  states: {
    code: string;
    value: string;
  }[],
  stateCode: string,
) => {
  const state = states.find((s) => s.code === stateCode);
  return state ? state.value : String(stateCode);
};

const OrderList = () => {
  const shippingStateCode = useRecoilValue(nestedCodeState);
  const states = shippingStateCode?.orderState.codes
    ? shippingStateCode.orderState.codes.map((codeObj) => ({ code: codeObj.code, value: codeObj.value }))
    : [];

  return (
    <List resource="orders">
      <Datagrid rowClick="edit">
        <TextField source="_id" label="주문번호" sortable={false} />
        <TextField source="user_id" label="주문자ID" sortable={false} />
        <FunctionField label="배송상태" render={(record: OrderDetail) => getStateString(states, record.state)} />
        <FunctionField
          label="배송지"
          render={(record: OrderDetail) => {
            return `${record.shippingInfo.address.value} ${record.shippingInfo.address.detailValue || ""}`;
          }}
        />
        <DateField source="createdAt" label="주문일시" showTime />
        <FunctionField
          label="총 결제 금액"
          render={(record: OrderDetail) => getPriceFormat({ price: record.cost.total })}
        />
      </Datagrid>
    </List>
  );
};

export default OrderList;
