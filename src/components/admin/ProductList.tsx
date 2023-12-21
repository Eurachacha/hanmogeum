import { List, Datagrid, TextField, FunctionField } from "react-admin";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Product } from "@/types/products";
import getCodeValue from "@/utils/getCodeValue";
import getPriceFormat from "@/utils/getPriceFormat";
import { flattenCodeState } from "@/recoil/atoms/codeState";

const ProductList = () => {
  const flattenCodes = useRecoilValue(flattenCodeState);
  const { authorId } = useParams();

  return (
    <List
      resource="products"
      filter={{ authorId }}
      sx={{
        "& th, td ": {
          fontSize: "1.4rem",
          textAlign: "center",
        },
        "& th": {
          padding: "12px 0",
          fontWeight: 600,
        },
        "td > span": {
          fontSize: "1.2rem",
        },
        "& td.column-price > span": {
          textAlign: "end",
        },
      }}
    >
      <Datagrid rowClick="edit">
        <TextField source="_id" label="상품ID" sortable={false} />
        <TextField source="name" label="상품명" sortable={false} />
        <FunctionField
          source="price"
          label="판매가격"
          render={(record: Product) => getPriceFormat({ price: record.price })}
          sortable
        />
        <FunctionField
          source="stock"
          label="재고"
          render={(record: Product) => record.quantity - record.buyQuantity}
          sortable
        />
        <FunctionField
          source="extra.pack"
          label="포장형태"
          render={(record: Product) => {
            return getCodeValue(flattenCodes, record.extra.pack[0]);
          }}
        />
        <TextField source="buyQuantity" label="누적주문수" sortable={false} />
      </Datagrid>
    </List>
  );
};

export default ProductList;
