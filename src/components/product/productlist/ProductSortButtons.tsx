import styled, { RuleSet, css } from "styled-components";
import { useLocation } from "react-router-dom";
import useQueryParams from "@/hooks/useQueryParams";

interface ProductSortButtonsProps {
  productLength: number;
}
const ProductSortButtons = ({ productLength }: ProductSortButtonsProps) => {
  const VARIENTS = {
    active: css`
      color: var(--color-gray-500);
      font-weight: var(--weight-bold);
    `,
    default: css`
      color: var(--color-gray-300);
    `,
  };
  const categoryArray = [
    { name: "인기순", sortNumber: 0 },
    { name: "최신순", sortNumber: 1 },
    { name: "가격낮은순", sortNumber: 2 },
    { name: "가격높은순", sortNumber: 3 },
  ];

  const { toggleSortFilter } = useQueryParams("sortType");

  const location = useLocation();
  const queryString = location.search;
  const searchParams = new URLSearchParams(queryString);
  const sortTypeKey = searchParams.get("sortType");

  return (
    <CategorySortLayer>
      <li>
        <StyledProductCount>전체 {productLength}개</StyledProductCount>
      </li>
      <li>
        {categoryArray.map((cate) => (
          <StyledCategorySortButton
            key={cate.name}
            onClick={() => toggleSortFilter(`${cate.sortNumber}`)}
            $variantStyle={sortTypeKey && +sortTypeKey === cate.sortNumber ? VARIENTS.active : VARIENTS.default}
          >
            {cate.name}
          </StyledCategorySortButton>
        ))}
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

const StyledCategorySortButton = styled.button<{ $variantStyle: RuleSet<object> }>`
  ${(props) => props.$variantStyle}
  background: none;
  padding: 4px 8px;
  border: none;

  font-size: 1.2rem;

  cursor: pointer;
`;
