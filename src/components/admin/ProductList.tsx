import { List, Datagrid, TextField, FunctionField, Pagination, BooleanField } from "react-admin";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Product } from "@/types/products";
import getCodeValue from "@/utils/getCodeValue";
import getPriceFormat from "@/utils/getPriceFormat";
import { flattenCodeState } from "@/recoil/atoms/codeState";

const ProductPagination = () => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />;

const ProductList = () => {
  const flattenCodes = useRecoilValue(flattenCodeState);
  const { authorId } = useParams();

  return (
    <List
      pagination={<ProductPagination />}
      perPage={10}
      resource="products"
      filter={{ authorId }}
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
        <TextField source="_id" label="상품ID" />
        <TextField source="name" label="상품명" />
        <FunctionField
          source="price"
          label="판매가격"
          render={(record: Product) => getPriceFormat({ price: record.price })}
        />
        <FunctionField
          source="stock"
          label="재고"
          render={(record: Product) => record.quantity - record.buyQuantity}
          sortable={false}
        />
        <FunctionField
          source="extra.pack"
          label="포장형태"
          render={(record: Product) => {
            return getCodeValue(flattenCodes, record.extra.pack[0]);
          }}
        />
        <TextField source="buyQuantity" label="누적주문수" sortable />
        <BooleanField source="show" label="상품 공개 여부" />
      </Datagrid>
    </List>
  );
};

export default ProductList;
