import styled from "styled-components";

interface ProductSortButtonsProps {
  productLength: number;
}
const ProductSortButtons = ({ productLength }: ProductSortButtonsProps) => {
  const changeQueryString = () => {
    // 쿼리스트링 변경하는 코드
  };

  return (
    <CategorySortLayer>
      <li>
        <StyledProductCount>전체 {productLength}개</StyledProductCount>
      </li>
      <li>
        <StyledCategorySortButton onClick={changeQueryString} type="button">
          인기순
        </StyledCategorySortButton>
        <StyledCategorySortButton type="button">최신순</StyledCategorySortButton>
        <StyledCategorySortButton type="button">낮은가격순</StyledCategorySortButton>
        <StyledCategorySortButton type="button">높은가격순</StyledCategorySortButton>
      </li>
    </CategorySortLayer>
  );
};

export default ProductSortButtons;

const CategorySortLayer = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const StyledProductCount = styled.p`
  font-size: 1.2rem;
  color: var(--color-gray-300);
`;

const StyledCategorySortButton = styled.button`
  background: none;
  padding: 4px 8px;
  border: none;

  font-size: 1.2rem;
  color: var(--color-gray-300);

  cursor: pointer;
`;
