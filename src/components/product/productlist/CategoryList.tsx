import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import ToggleDefault from "@/assets/icons/toggleDefault.svg?react";
import ToggleActive from "@/assets/icons/toggleActive.svg?react";
import CategoryButtonList from "./CategoryButtonList";
import { nestedCodeState } from "@/recoil/atoms/codeState";
import { CATEGORY_CONTENT, CATEGORY_TITLE } from "@/constants/category";
import useQueryParams from "@/hooks/useQueryParams";

const CategoryList = () => {
  const [codes] = useRecoilState(nestedCodeState);

  const [isDecaf, setIsDecaf] = useState(false);

  const handleIsDecaf = () => {
    setIsDecaf(!isDecaf);
    toggleDecafFilter(!isDecaf);
  };

  const { toggleDecafFilter } = useQueryParams("isDecaf");

  return (
    <CategoryListLayer>
      <StyledTitle $fontSize="3.6rem" $fontWeight="var(--weight-bold)" $margin="0 0 60px 0">
        전체상품
      </StyledTitle>

      {codes?.productCategory.codes.map(
        (item, index) =>
          index > 0 &&
          (item.sub ? (
            <CategoryListWrapper key={item.sort}>
              <StyledTitleDisplay>
                <StyledTitle $fontSize="1.6rem" $fontWeight="var(--weight-semibold)">
                  {CATEGORY_TITLE[item.value]}
                </StyledTitle>
                <StyledSubTitle>{CATEGORY_CONTENT[item.value]}</StyledSubTitle>
              </StyledTitleDisplay>

              <StyledButtonList>
                <CategoryButtonList subCategory={item.sub} value={item.value} />
              </StyledButtonList>
            </CategoryListWrapper>
          ) : (
            <CategoryListWrapper key={item.sort}>
              <StyledDecafTitleDisplay>
                <StyledTitle $fontSize="1.6rem" $fontWeight="var(--weight-semibold)">
                  디카페인
                </StyledTitle>

                <button onClick={handleIsDecaf}>{isDecaf ? <ToggleActive /> : <ToggleDefault />}</button>
              </StyledDecafTitleDisplay>
            </CategoryListWrapper>
          )),
      )}
    </CategoryListLayer>
  );
};

export default CategoryList;
const CategoryListLayer = styled.div`
  width: 360px;
  margin-right: 40px;
`;

const CategoryListWrapper = styled.div`
  border-bottom: 1px solid var(--color-gray-100);
`;

const StyledTitleDisplay = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
`;

const StyledTitle = styled.h2<{ $fontSize: string; $fontWeight?: string; $margin?: string }>`
  font-family: "Maruburi", "sans-serif";

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

const StyledDecafTitleDisplay = styled(StyledTitleDisplay)`
  justify-content: space-between;
  button {
    border: none;
    background: none;
  }
`;

const StyledButtonList = styled.div`
  margin: 30px 0;
`;
