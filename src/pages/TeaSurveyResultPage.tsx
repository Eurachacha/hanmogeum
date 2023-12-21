import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductItemList from "../components/product/productlist/ProductItemList";
import productsApi from "@/apis/services/products";
import { Extra, Product } from "@/types/products";
import Button from "@/components/common/Button";

const TeaSurveyResultPage = () => {
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
      <ProductItemList products={products} listCount={2} />
      <StyledTeaSurveyResultButtons>
        <Button onClick={reSurvey} size="md" value="다시 검사하기" variant="sub" />
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
`;

const StyledTeaSurveyResultButtons = styled.div`
  margin-top: 40px;

  display: flex;
  gap: 20px;
`;
