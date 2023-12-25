import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import ProductItem from "./ProductItem";
import { Product } from "@/types/products";
import EmptyMessage from "@/components/common/EmptyMessage";

interface ProductItemListProps {
  products: Product[];
  listCount: number;
  pagination?: number;
  onClick?: (event: React.ChangeEvent<unknown>, page: number) => void;
  currentPage: number;
}

const ProductItemList = ({ products, listCount, pagination, onClick, currentPage }: ProductItemListProps) => {
  return products.length ? (
    <>
      <ProductItemListLayer $listCount={listCount}>
        {products &&
          products.map((product, idx) => {
            const key = idx.toString();
            return <ProductItem product={product} key={key} />;
          })}
      </ProductItemListLayer>
      <PaginationWrapper>
        <Pagination
          defaultPage={1}
          page={currentPage}
          count={pagination}
          onChange={onClick}
          shape="rounded"
          showFirstButton
          showLastButton
          size="large"
        />
      </PaginationWrapper>
    </>
  ) : (
    <EmptyMessage />
  );
};

export default ProductItemList;

const ProductItemListLayer = styled.div<{ $listCount: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$listCount}, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(${(props) => props.$listCount - 1}, 1fr);
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 40px;
`;
