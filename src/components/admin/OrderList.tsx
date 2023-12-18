import { List, Datagrid, TextField, FunctionField, DateField } from "react-admin";
import { useRecoilValue } from "recoil";
import { OrderDetail } from "@/types/orders";
import getPriceFormat from "@/utils/getPriceFormat";
import getCodeValue from "@/utils/getCodeValue";
import { flattenCodeState } from "@/recoil/atoms/codeState";

const OrderList = () => {
  const flattenCodes = useRecoilValue(flattenCodeState);

  return (
    <List resource="orders">
      <Datagrid rowClick="edit">
        <TextField source="_id" label="주문번호" sortable={false} />
        <TextField source="user_id" label="주문자ID" sortable={false} />
        <FunctionField label="배송상태" render={(record: OrderDetail) => getCodeValue(flattenCodes, record.state)} />
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
