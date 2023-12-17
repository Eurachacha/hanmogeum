import { List, Datagrid, TextField, FunctionField } from "react-admin";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Product } from "@/types/products";
import { flattenCodeState } from "@/recoil/atoms/codeState";
import { FlattenData } from "@/types/code";
import getPriceFormat from "@/utils/getPriceFormat";

const getExtraString = (states: FlattenData, stateCode: string) => {
  return states[stateCode].value;
};

const ProductList = () => {
  const flattenCodes = useRecoilValue(flattenCodeState);

  const { authorId } = useParams();
  return (
    <List resource="products" filter={{ authorId }}>
      <Datagrid rowClick="edit">
        <TextField source="_id" label="상품ID" sortable={false} />
        <TextField source="name" label="상품명" sortable={false} />
        <FunctionField
          label="판매가격"
          render={(record: Product) => getPriceFormat({ price: record.price })}
          sortable
        />
        <FunctionField label="재고" render={(record: Product) => record.quantity - record.buyQuantity} sortable />
        <FunctionField
          label="포장형태"
          render={(record: Product) => {
            return getExtraString(flattenCodes, record.extra.pack[0]);
          }}
        />
        <TextField source="buyQuantity" label="누적주문수" sortable />
      </Datagrid>
    </List>
  );
};

export default ProductList;
