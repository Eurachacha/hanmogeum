import styled from "styled-components";
import CategoryList from "@/components/category/CategoryList";
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
  display: flex;
  justify-content: space-between;

  margin-top: 35px;
`;
