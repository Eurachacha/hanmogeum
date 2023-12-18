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
  FieldTitle,
} from "react-admin";
import { useRecoilValue } from "recoil";
import { OrderStateCode } from "@/types/code";
import { nestedCodeState } from "@/recoil/atoms/codeState";
import { OrderDetail } from "@/types/orders";

const OrderEdit = () => {
  const nestedCodes = useRecoilValue(nestedCodeState);
  const orderStateChoices = nestedCodes?.orderState.codes.map((codeObj: OrderStateCode) => {
    return { id: codeObj.code, name: codeObj.value };
  });

  return (
    <Edit>
      <SimpleForm>
        <Labeled source="주문번호">
          <TextField source="_id" />
        </Labeled>
        <Labeled source="주문자 ID">
          <TextField source="user_id" label="주문자 ID" />
        </Labeled>
        <Labeled source="주문일시">
          <DateField source="createdAt" showTime />
        </Labeled>
        <FieldTitle label="배송정보"></FieldTitle>
        <Labeled source="받는사람 이름">
          <TextField source="shippingInfo.name" />
        </Labeled>
        <Labeled source="받는사람 연락처">
          <TextField source="shippingInfo.phone" />
        </Labeled>
        <Labeled source="받는 곳 주소">
          <TextField source="shippingInfo.address.value" />
        </Labeled>
        <SelectInput source="state" label="배송상태" choices={orderStateChoices} />
        <ArrayField source="products" textAlign="center">
          <Datagrid bulkActionButtons={false}>
            <TextField source="_id" label="상품ID" />
            <TextField source="name" label="상품명" />
            <TextField source="quantity" label="주문수량" />
          </Datagrid>
        </ArrayField>
        <FieldTitle label="금액정보"></FieldTitle>
        <Labeled source="상품금액">
          <TextField source="cost.products" />
        </Labeled>
        <Labeled source="배송비">
          <FunctionField
            render={(record: OrderDetail) => record.cost.shippingFees - record.cost.discount.shippingFees}
          />
        </Labeled>
        <Labeled source="총 결제 금액">
          <TextField source="cost.total" />
        </Labeled>
      </SimpleForm>
    </Edit>
  );
};

export default OrderEdit;
