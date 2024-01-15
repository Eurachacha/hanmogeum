import styled from "styled-components";
import { Product } from "@/types/products";
import ProductItemList from "../product/productList/ProductItemList";

interface MainProductsListProps {
  products: Product[]; // DB장바구니 state
  title: string;
  content: string;
}

const MainProductsList = ({ products, title, content }: MainProductsListProps) => {
  return (
    <MainProductsListLayer>
      <StyledMainProductsListText>
        <h2>{title}</h2>
        <p>{content}</p>
      </StyledMainProductsListText>

      <ProductItemList products={products} listCount={4} />
    </MainProductsListLayer>
  );
};
export default MainProductsList;

const MainProductsListLayer = styled.div`
  margin: 80px 0;
`;

const StyledMainProductsListText = styled.div`
  text-align: center;
  padding: 40px 0;

  h2 {
    font-size: 2.8rem;
    font-weight: var(--weight-bold);
    margin-bottom: 10px;
  }
  p {
    color: var(--color-gray-300);
    font-size: 1.4rem;
  }
`;
