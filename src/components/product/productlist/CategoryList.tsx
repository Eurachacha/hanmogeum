import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import ToggleDefault from "@/assets/icons/toggleDefault.svg?react";
import ToggleActive from "@/assets/icons/toggleActive.svg?react";
import CategoryButtonList from "./CategoryButtonList";
import { nestedCodeState } from "@/recoil/atoms/codeState";

const CategoryList = () => {
  const [codes] = useRecoilState(nestedCodeState);

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
              {toggle ? <ToggleActive /> : <ToggleDefault />}
            </StyledToggleButton>
          </StyledTitleDisplayContent>
        </ProductListCategoryWrapper>

        {/* TODO: sort로 지정한 map의 key를 변수로 수정 */}

        {codes?.productCategory.codes.map((code) => (
          <ProductListCategoryWrapper key={code.sort}>
            <StyledTitleDisplay>
              <StyledTitle $fontSize="1.6rem" $fontWeight="var(--weight-semibold)">
                {code.value}
              </StyledTitle>
              <StyledSubTitle>좋아하는 맛을 선택해보세요.</StyledSubTitle>
            </StyledTitleDisplay>

            <CategoryButtonList value={code.value} subCategory={code.sub} />
          </ProductListCategoryWrapper>
        ))}
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
