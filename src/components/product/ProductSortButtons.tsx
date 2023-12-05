import styled from "styled-components";

const ProductSortButtons = () => {
  return (
    <CategorySortWrapper>
      <li>
        <StyledProductCount>전체 3230개</StyledProductCount>
      </li>
      <li>
        <StyledCategorySortButton>인기순</StyledCategorySortButton>
        <StyledCategorySortButton>최신순</StyledCategorySortButton>
        <StyledCategorySortButton>높은가격순</StyledCategorySortButton>
        <StyledCategorySortButton>낮은가격순</StyledCategorySortButton>
      </li>
    </CategorySortWrapper>
  );
};

export default ProductSortButtons;

const CategorySortWrapper = styled.ul`
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
