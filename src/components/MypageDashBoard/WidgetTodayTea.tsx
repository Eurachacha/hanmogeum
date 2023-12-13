import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import productsApi from "@/apis/services/products";
import { Product } from "@/types/products";
import getRandomRange from "@/utils/getRandomRange";
import { flattenCodeState } from "@/recoil/atoms/codeState";

interface TodayTeaItem {
  name: string;
  imgURL: string[];
  hashTag: string[];
}

const WidgetTodayTea = () => {
  const [bestProducts, setBestProducts] = useState<Product[]>();
  const [todayTea, setTodayTea] = useState<TodayTeaItem>();
  const codeData = useRecoilValue(flattenCodeState);
  const fetchAndSetBestProducts = async () => {
    try {
      const { data } = await productsApi.getProductByIsBest();
      setBestProducts(data.item);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 전체 상품 갯수 가져오기
    fetchAndSetBestProducts();
  }, []);

  useEffect(() => {
    const randomId = getRandomRange({ min: 0, max: bestProducts ? bestProducts.length - 1 : 1 });

    const newTea: TodayTeaItem = {
      name: "",
      imgURL: [],
      hashTag: [],
    };

    if (bestProducts) {
      newTea.name = bestProducts[randomId]?.name;
      newTea.imgURL = bestProducts[randomId]?.mainImages;
      newTea.hashTag = bestProducts[randomId]?.extra.hashTag;
    }
    newTea.hashTag = newTea.hashTag.map((code) => `#${codeData[code]?.value}`);
    setTodayTea(newTea);
  }, [bestProducts]);

  return (
    <WidgetTodayTeaLayer>
      <TitleWrapper>오늘의 추천 차</TitleWrapper>
      <ContentsWrapper>
        <ProductImgStyle>
          <img src={todayTea?.imgURL[0] || ""} alt={todayTea?.name} />
        </ProductImgStyle>
        <ProductInfoStyle>
          <ProductNameStyle>{todayTea?.name}</ProductNameStyle>
          <ProductNameHashTag>{todayTea?.hashTag.join(" ")}</ProductNameHashTag>
        </ProductInfoStyle>
      </ContentsWrapper>
    </WidgetTodayTeaLayer>
  );
};

export default WidgetTodayTea;

const WidgetTodayTeaLayer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TitleWrapper = styled.div`
  color: var(--color-sub-500);
  font-weight: var(--weight-bold);
`;

const ContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--color-gray-100);
  border-radius: 5px;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
`;

const ProductImgStyle = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  width: 6rem;
  height: 5rem;
  overflow: hidden;
  img {
    height: inherit;
  }
`;
const ProductInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
const ProductNameStyle = styled.div`
  font-size: 1.4rem;
  font-weight: var(--weight-bold);
`;
const ProductNameHashTag = styled.div`
  font-size: 1.2rem;
  font-weight: var(--weight-regular);
  color: var(--color-gray-300);
`;
