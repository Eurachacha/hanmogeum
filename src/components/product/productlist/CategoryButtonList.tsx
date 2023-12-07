import styled from "styled-components";
import { useState } from "react";
import CategoryButton from "./CategoryButton";
import useQueryParams from "@/hooks/useQueryParams";

interface CategoryButtonListProps {
  value: string;
  subCategory: Array<SubCategoryType>;
}
type SubCategoryType = {
  sort: number;
  code: string;
  value: string;
  parent: string;
  depth: number;
};

const CategoryButtonList = ({ value, subCategory }: CategoryButtonListProps) => {
  const { toggleFilter, curQueryData } = useQueryParams(`${value}`);

  return (
    <CategoryButtonListLayer>
      {subCategory.map((category) => (
        <CategoryButton key={category.sort} variant="default" onClick={() => toggleFilter(`${category.value}`)}>
          {category.value}
        </CategoryButton>
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
