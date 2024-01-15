import styled from "styled-components";
import CategoryList from "@/components/product/productList/CategoryList";
import ProductSortContainer from "@/containers/product/ProductSortContainer";

const ProductListPage = () => {
  return (
    <ProductListLayer>
      <CategoryList />
      <ProductSortContainer />
    </ProductListLayer>
  );
};

export default ProductListPage;

const ProductListLayer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 40px;
  margin-bottom: 40px;
`;
