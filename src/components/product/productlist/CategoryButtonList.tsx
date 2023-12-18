import styled from "styled-components";
import CategoryButton from "./CategoryButton";
import useQueryParams from "@/hooks/useQueryParams";
import { CodeWithSub } from "@/types/code";

interface CategoryButtonListProps {
  value: string;
  subCategory: CodeWithSub[];
}
const CategoryButtonList = ({ value, subCategory }: CategoryButtonListProps) => {
  const { toggleFilter } = useQueryParams(`${value}`);

  return (
    <CategoryButtonListLayer>
      {subCategory.map((category) => (
        <CategoryButton
          key={category.sort + category.code}
          handleClick={() => toggleFilter(category.code)}
          code={category.code}
        />
      ))}
    </CategoryButtonListLayer>
  );
};

export default CategoryButtonList;

const CategoryButtonListLayer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
