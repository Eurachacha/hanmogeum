import {
  Edit,
  SimpleForm,
  Datagrid,
  TextField,
  DateField,
  Labeled,
  SelectInput,
  FunctionField,
  ArrayField,
} from "react-admin";
import { useRecoilValue } from "recoil";
import { OrderStateCode } from "@/types/code";
import { nestedCodeState } from "@/recoil/atoms/codeState";
import { OrderDetail } from "@/types/orders";
import getPriceFormat from "@/utils/getPriceFormat";
import { Product } from "@/types/products";
import autoHyphenPhoneNumber from "@/utils/autoHyphenPhoneNumber";

const OrderEdit = () => {
  const nestedCodes = useRecoilValue(nestedCodeState);
  const orderStateChoices = nestedCodes?.orderState.codes.map((codeObj: OrderStateCode) => {
    return { id: codeObj.code, name: codeObj.value };
  });

  return (
    <Edit
      sx={{
        "& .RaLabeled-label": {
          minWidth: 120,
        },
        "& span": {
          fontSize: "1.8rem",
        },
        "& #state": {
          fontSize: "1.6rem",
          height: 40,
          display: "flex",
          alignItems: "center",
        },
        "& th, td ": {
          textAlign: "center",
        },
      }}
    >
      <SimpleForm>
        <Labeled source="주문번호" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <TextField source="_id" />
        </Labeled>
        <Labeled source="주문자 ID" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <TextField source="user_id" label="주문자ID" />
        </Labeled>
        <Labeled source="주문일시" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <DateField source="createdAt" showTime />
        </Labeled>
        <b style={{ fontSize: "2rem", padding: "12px 0" }}>배송정보</b>
        <Labeled source="받는사람 이름" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <TextField source="shippingInfo.name" sx={{ paddingLeft: 4 }} />
        </Labeled>
        <Labeled
          source="받는사람 연락처"
          sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
        >
          <FunctionField
            sx={{ paddingLeft: 4 }}
            render={(record: OrderDetail) => autoHyphenPhoneNumber(record.shippingInfo.phone)}
          />
        </Labeled>
        <Labeled source="받는 곳 주소" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <FunctionField
            sx={{ paddingLeft: 4 }}
            render={(record: OrderDetail) =>
              `${record.shippingInfo.address.value} ${record.shippingInfo.address.detailValue}`
            }
          />
        </Labeled>
        <Labeled
          source="배송상태"
          sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}
        >
          <SelectInput
            isRequired
            source="state"
            label="배송상태"
            choices={orderStateChoices}
            sx={{
              marginLeft: 4,
              "& label": { padding: "4px 0" },
              "& input": { fontSize: "20px" },
              ".MuiFilledInput-root": { height: "100%" },
              "MuiSelect-nativeInput": { fontSize: "1.6rem" },
            }}
          />
        </Labeled>
        <ArrayField source="products" textAlign="center">
          <Datagrid bulkActionButtons={false}>
            <TextField source="_id" label="상품ID" />
            <TextField source="name" label="상품명" />
            <FunctionField
              source="price"
              label="판매가격"
              render={(record: Product) => getPriceFormat({ price: record.price / record.quantity })}
            />
            <TextField source="quantity" label="주문수량" />
            <FunctionField
              source="priceSum"
              label="계"
              render={(record: Product) => getPriceFormat({ price: record.price })}
              sortable={false}
            />
          </Datagrid>
        </ArrayField>
        <b style={{ fontSize: "2rem", padding: "12px 0" }}>결제 정보</b>
        <Labeled
          source="상품금액"
          sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "230px" }}
        >
          <FunctionField render={(record: OrderDetail) => getPriceFormat({ price: record.cost.products })} />
        </Labeled>
        <Labeled
          source="배송비"
          sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "230px" }}
        >
          <FunctionField
            render={(record: OrderDetail) =>
              getPriceFormat({ price: record.cost.shippingFees - record.cost.discount.shippingFees })
            }
          />
        </Labeled>
        <Labeled
          source="총 결제 금액"
          sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "230px" }}
        >
          <FunctionField render={(record: OrderDetail) => getPriceFormat({ price: record.cost.total })} />
        </Labeled>
      </SimpleForm>
    </Edit>
  );
};

export default OrderEdit;
