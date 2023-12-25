import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Extra } from "@/types/products";
import { flattenCodeState } from "@/recoil/atoms/codeState";

const CategoryInfo = ({ extra }: { extra: Extra }) => {
  const categoryCodes = useRecoilValue(flattenCodeState);

  return (
    <CategoryInfoLayer>
      <img src="/images/blackSticker.png" alt="logo" width={80} height={80} />
      <div>
        <Category>
          <CategoryTitle>포장형태</CategoryTitle>
          <Tag>{categoryCodes[extra.pack[0]].value}</Tag>
        </Category>
        <Category>
          <CategoryTitle>차 종류</CategoryTitle>
          <TagList>
            {extra.teaType.map((code) => (
              <Tag>{categoryCodes[code].value}</Tag>
            ))}
          </TagList>
        </Category>
        <Category>
          <CategoryTitle>맛</CategoryTitle>
          <TagList>
            {extra.taste.map((code) => (
              <Tag>{categoryCodes[code].value}</Tag>
            ))}
          </TagList>
        </Category>
      </div>
    </CategoryInfoLayer>
  );
};

export default CategoryInfo;

const CategoryInfoLayer = styled.div`
  min-width: 300px;
  max-width: 600px;
  height: 150px;
  background-color: var(--color-gray-50);
  border-top: none;
  border-bottom: none;
  margin: 10px 0;

  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1149px) {
    width: 100%;
  }
`;

const Category = styled.div`
  display: flex;
  align-items: baseline;
  margin: 4px 0;
  padding-right: 20px;
`;

const CategoryTitle = styled.p`
  color: var(--color-gray-300);
  font-size: 1.4rem;
  font-weight: var(--weight-bold);
  min-width: 60px;
  text-align: end;
  margin: 0 8px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 1.2rem;
  font-weight: var(--weight-medium);
  color: var(--color-white);
  background-color: var(--color-gray-300);
  padding: 4px;
  margin: 0 2px;
  border-radius: 5px;
`;
