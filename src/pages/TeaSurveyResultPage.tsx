import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductItemList from "../components/product/productlist/ProductItemList";
import productsApi from "@/apis/services/products";
import { Extra, Product } from "@/types/products";
import Button from "@/components/common/Button";
import ProductItem from "@/components/product/productlist/ProductItem";

const TeaSurveyResultPage = () => {
  const location = useLocation();
  const queryString = location.search;

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  const [products, setProducts] = useState<Product[]>([]);
  const localData = JSON.parse(localStorage.getItem("surveyResult") || "");
  const navigate = useNavigate();

  type filterObjectType = Partial<Extra>;
  const filterObject: filterObjectType = {};

  const tasteValue = localData.taste.split(",");
  const packValue = localData.pack.split(",");
  const isDecafValue = localData.isDecaf;
  const priceValue = localData.price;

  if (packValue) {
    filterObject.pack = packValue;
  }
  if (tasteValue) {
    filterObject.taste = tasteValue;
  }
  if (isDecafValue) {
    filterObject.isDecaf = Boolean(isDecafValue[0]);
  }
  const getResultData = async (filterDataObject?: filterObjectType) => {
    try {
      const response = await productsApi.searchProducts({
        filter: filterDataObject,
        price: priceValue,
      });
      const { item } = response.data;
      setProducts(item);
    } catch (error) {
      console.error(error);
    }
  };

  const reSurvey = () => {
    navigate("/recommend");
  };

  useEffect(() => {
    getResultData(filterObject);
  }, []);

  return (
    <TeaSurveyResultPageLayer>
      <h2>이런 차를 추천해요!</h2>
      <TeaSurveyResultItemsWrapper>
        {products &&
          products.map((product, idx) => {
            const key = idx.toString();
            return <ProductItem product={product} key={key} />;
          })}
      </TeaSurveyResultItemsWrapper>
      <StyledTeaSurveyResultButtons>
        <Button onClick={reSurvey} size="md" value="다시 검사하기" variant="sub" />
        <Button
          value="링크 공유하기"
          size="md"
          variant="point"
          onClick={() => handleCopyClipBoard(`${import.meta.env.VITE_API_BASE_URL}/${queryString}`)}
        />
      </StyledTeaSurveyResultButtons>
    </TeaSurveyResultPageLayer>
  );
};

export default TeaSurveyResultPage;

const TeaSurveyResultPageLayer = styled.div`
  width: 40vw;
  margin: 0 auto;
  padding: 80px 0;

  h2 {
    font-size: 2.4rem;
    font-weight: var(--weight-bold);

    margin-bottom: 40px;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const TeaSurveyResultItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px 14px;
  }
`;

const StyledTeaSurveyResultButtons = styled.div`
  margin-top: 40px;

  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: block;

    button:first-child {
      margin-bottom: 10px;
    }
  }
`;
