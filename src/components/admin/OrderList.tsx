import { List, Datagrid, TextField, FunctionField, DateField, Pagination } from "react-admin";
import { useRecoilValue } from "recoil";
import { OrderDetail } from "@/types/orders";
import getPriceFormat from "@/utils/getPriceFormat";
import getCodeValue from "@/utils/getCodeValue";
import { flattenCodeState } from "@/recoil/atoms/codeState";

const OrderPagination = () => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />;

const OrderList = () => {
  const flattenCodes = useRecoilValue(flattenCodeState);

  return (
    <List
      pagination={<OrderPagination />}
      perPage={10}
      sort={{ field: "createdAt", order: "ASC" }}
      resource="orders"
      sx={{
        "& th, td ": {
          fontSize: "1.6rem",
          textAlign: "center",
        },
        "& th": {
          padding: "12px 0",
          fontWeight: 600,
        },
        "td > span": {
          fontSize: "1.4rem",
        },
        "& td.column-price > span": {
          textAlign: "end",
        },
        "& .MuiTablePagination-root *": {
          fontSize: "1.2rem",
        },
      }}
      exporter={false}
    >
      <Datagrid rowClick="edit">
        <TextField source="_id" label="주문번호" />
        <TextField source="user_id" label="주문자ID" />
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
          source="cost.total"
          render={(record: OrderDetail) => getPriceFormat({ price: record.cost.total })}
          sortable
        />
      </Datagrid>
    </List>
  );
};

export default OrderList;
