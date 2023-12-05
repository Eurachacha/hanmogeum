import styled from "styled-components";
import { useState } from "react";
import CategoryButtonList from "@/components/category/CategoryButtonList";
import { Product } from "@/types/products";
import ToggleDefault from "@/assets/icons/toggleDefault.svg?react";
import ToggleActive from "@/assets/icons/toggleActive.svg?react";

const CategoryList = ({ products }: { products: Product[] }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <ProductListCategoryLayer>
      <StyledTitle $fontSize="3.6rem" $fontWeight="var(--weight-bold)" $margin="0 0 40px 0">
        전체상품
      </StyledTitle>

      <ul>
        <ProductListCategoryWrapper>
          <StyledTitleDisplayContent>
            <StyledTitle $fontSize="1.6rem" $fontWeight="var(--weight-semibold)">
              디카페인
            </StyledTitle>
            <StyledToggleButton onClick={handleToggle}>
              {toggle ? <ToggleDefault /> : <ToggleActive />}
            </StyledToggleButton>
          </StyledTitleDisplayContent>
        </ProductListCategoryWrapper>

        <ProductListCategoryWrapper>
          <StyledTitleDisplay>
            <StyledTitle $fontSize="1.6rem" $fontWeight="var(--weight-semibold)">
              종류
            </StyledTitle>
            <StyledSubTitle>다양한 차를 종류별로 즐겨보세요</StyledSubTitle>
          </StyledTitleDisplay>
          <CategoryButtonList />
        </ProductListCategoryWrapper>

        <ProductListCategoryWrapper>
          <StyledTitleDisplay>
            <StyledTitle $fontSize="1.6rem" $fontWeight="var(--weight-semibold)">
              맛
            </StyledTitle>
            <StyledSubTitle>다양한 차를 종류별로 즐겨보세요</StyledSubTitle>
          </StyledTitleDisplay>
          <CategoryButtonList />
        </ProductListCategoryWrapper>

        <ProductListCategoryWrapper>
          <StyledTitleDisplay>
            <StyledTitle $fontSize="1.6rem" $fontWeight="var(--weight-semibold)">
              상황
            </StyledTitle>
            <StyledSubTitle>다양한 차를 종류별로 즐겨보세요</StyledSubTitle>
          </StyledTitleDisplay>
          <CategoryButtonList />
        </ProductListCategoryWrapper>
      </ul>
    </ProductListCategoryLayer>
  );
};

export default CategoryList;

const ProductListCategoryLayer = styled.div`
  width: 40%;
  margin-right: 40px;
`;

const ProductListCategoryWrapper = styled.li`
  border-bottom: 1px solid var(--color-gray-100);
  padding-bottom: 12px;
`;

const StyledTitle = styled.h2<{ $fontSize: string; $fontWeight?: string; $margin?: string }>`
  font-family: "Maruburi";

  font-size: ${(props) => props.$fontSize};
  font-weight: ${(props) => props.$fontWeight};
  margin: ${(props) => props.$margin};

  color: var(--color-sub-500);
`;

const StyledSubTitle = styled.span`
  color: var(--color-gray-300);
  font-size: 1rem;
  font-weight: var(--weight-thin);
  margin-left: 8px;
`;

const StyledTitleDisplay = styled.div`
  display: flex;
  align-items: center;

  padding: 12px 0;
`;

const StyledTitleDisplayContent = styled(StyledTitleDisplay)`
  justify-content: space-between;
`;

const StyledToggleButton = styled.button`
  background: none;
  border: none;
`;
