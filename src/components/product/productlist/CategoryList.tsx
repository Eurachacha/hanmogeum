import styled from "styled-components";
import { useState } from "react";
import ToggleDefault from "@/assets/icons/toggleDefault.svg?react";
import ToggleActive from "@/assets/icons/toggleActive.svg?react";
import CategoryButtonList from "./CategoryButtonList";

const CategoryList = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  // TODO: 하드코딩한 데이터 axios로 받아오기
  const codes = [
    {
      sort: 1,
      code: "PC02",
      value: "종류",
      depth: 1,
      sub: [
        {
          sort: 1,
          code: "PC0201",
          value: "홍차",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 2,
          code: "PC0203",
          value: "녹차",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 3,
          code: "PC0202",
          value: "허브티",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 4,
          code: "PC0201",
          value: "우롱차",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 5,
          code: "PC0201",
          value: "보이차",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 6,
          code: "PC0201",
          value: "블랜드",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 7,
          code: "PC0201",
          value: "꽃차",
          parent: "PC02",
          depth: 2,
        },
      ],
    },
    {
      sort: 2,
      code: "PC01",
      value: "맛",
      depth: 1,
      sub: [
        {
          sort: 1,
          code: "PC0201",
          value: "달콤한",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 2,
          code: "PC0203",
          value: "새콤한",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 3,
          code: "PC0202",
          value: "상쾌한",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 4,
          code: "PC0202",
          value: "상큼한",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 5,
          code: "PC0202",
          value: "씁쓸한",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 6,
          code: "PC0202",
          value: "고소한",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 7,
          code: "PC0202",
          value: "깔끔한",
          parent: "PC02",
          depth: 2,
        },
      ],
    },
    {
      sort: 3,
      code: "PC03",
      value: "상황",
      depth: 1,
      sub: [
        {
          sort: 1,
          code: "PC0201",
          value: "겨울에_좋아요",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 2,
          code: "PC0203",
          value: "깔끔해요",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 3,
          code: "PC0202",
          value: "다이어트",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 4,
          code: "PC0202",
          value: "임산부에게_좋아요",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 5,
          code: "PC0202",
          value: "집중력_향상",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 6,
          code: "PC0202",
          value: "스트레스_해소",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 7,
          code: "PC0202",
          value: "입가심으로_좋아요",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 8,
          code: "PC0202",
          value: "크리스마스_에디션",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 9,
          code: "PC0202",
          value: "선물하기_좋아요",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 10,
          code: "PC0202",
          value: "라즈베리_초콜릿_향",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 11,
          code: "PC0202",
          value: "향긋해요",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 12,
          code: "PC0202",
          value: "잠들기전에_마시기_좋아요",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 13,
          code: "PC0202",
          value: "남녀노소_인기만점",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 14,
          code: "PC0202",
          value: "식전티",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 15,
          code: "PC0202",
          value: "소화에_좋아요",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 16,
          code: "PC0202",
          value: "냉침",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 17,
          code: "PC0202",
          value: "깊은맛",
          parent: "PC02",
          depth: 2,
        },
        {
          sort: 18,
          code: "PC0202",
          value: "감기_탈출",
          parent: "PC02",
          depth: 2,
        },
      ],
    },
  ];

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

        {codes.map((code) => (
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
