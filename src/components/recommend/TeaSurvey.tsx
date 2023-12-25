import styled, { css, RuleSet } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../common/Button";

const VARIANTS = {
  default: css`
    background: none;
    color: var(--color-gray-400);
    font-weight: var(--weight-regular);
    border: 1px solid var(--color-gray-100);
  `,
  active: css`
    background: var(--color-sub-500);
    color: var(--color-gray-100);
    font-weight: var(--weight-bold);
    border: 1px solid var(--color-sub-500);
  `,
};

const TeaSurvey = () => {
  // 쿼리스트링
  const navigate = useNavigate();
  const [pack, setPack] = useState("");
  const [taste, setTaste] = useState("");
  const [isDecaf, setIsDecaf] = useState(false);
  const [price, setPrice] = useState(0);

  // 버튼 active
  const packData = [
    {
      title: "티백",
      content: "간편하게 우리는",
      data: "PC0101",
    },
    {
      title: "잎차",
      content: "눈이 즐거운",
      data: "PC0102",
    },
    {
      title: "분말",
      content: "속이 든든한",
      data: "PC0103",
    },
    {
      title: "음료/원액",
      content: "차갑게 마시기 좋은",
      data: "PC0104",
    },
  ];

  const tasteData = [
    {
      title: "달콤한",
      data: "PC0401",
    },
    {
      title: "새콤한",
      data: "PC0402",
    },
    {
      title: "씁쓸한",
      data: "PC0403",
    },
    {
      title: "고소한",
      data: "PC0404",
    },
    {
      title: "깔끔한",
      data: "PC0405",
    },
  ];

  const isDecafData = [
    {
      title: "디카페인",
      content: "밤에 마시기 좋은",
      data: true,
    },
    {
      title: "카페인",
      content: "기운 나는",
      data: false,
    },
  ];

  const priceData = [
    {
      title: "10000원 이하",
      data: 10000,
    },
    {
      title: "20000원 이하",
      data: 20000,
    },
    {
      title: "30000원 이하",
      data: 30000,
    },
    {
      title: "모든 가격",
      data: 1000000,
    },
  ];

  const [isPackClicked, setIsPackClicked] = useState<number | null>(null);
  const [isTasteClicked, setTasteIsClicked] = useState<number | null>(null);
  const [isDecafClicked, setIsDecafClicked] = useState<number | null>(null);
  const [isPriceClicked, setIsPriceClicked] = useState<number | null>(null);

  const onPackClick = (index: number, data: string) => {
    setIsPackClicked(index);
    setPack(data);
  };
  const onTasteClick = (index: number, data: string) => {
    setTasteIsClicked(index);
    setTaste(data);
  };
  const onIsDecafClick = (index: number, data: boolean) => {
    setIsDecafClicked(index);
    setIsDecaf(data);
  };
  const onIsPriceClick = (index: number, data: number) => {
    setIsPriceClicked(index);
    setPrice(data);
  };

  // 로컬스토리지 저장
  const setLocalStorage = () => {
    const surveyResult = { pack: pack, taste: taste, isDecaf: isDecaf, price: price };
    localStorage.setItem("surveyResult", JSON.stringify(surveyResult));
    const surveyresult = JSON.parse(localStorage.getItem("surveyResult")!);
    navigate(
      `/surveyresult?pack=${surveyresult.pack}&taste=${surveyresult.taste}&isDecaf=${surveyresult.isDecaf}&price=${surveyresult.price}`,
    );
  };

  return (
    <TeaSurveyLayer>
      <TeaSurveyWrapper>
        <StyledTeaSurveyTitle>어떤 종류를 선호하시나요?</StyledTeaSurveyTitle>
        <TeaSurveyButtonWrapper>
          {packData.map((item, index) => {
            const keyIndex = index.toString();
            return (
              <li key={keyIndex}>
                <StyledTeasurveyButton
                  onClick={() => onPackClick(index, item.data)}
                  $variantStyle={isPackClicked === index ? VARIANTS.active : VARIANTS.default}
                >
                  <p>{item.content}</p>
                  <h2>{item.title}</h2>
                </StyledTeasurveyButton>
              </li>
            );
          })}
        </TeaSurveyButtonWrapper>
      </TeaSurveyWrapper>

      <TeaSurveyWrapper>
        <StyledTeaSurveyTitle>어떤 맛을 선호하시나요?</StyledTeaSurveyTitle>
        <TeaSurveyButtonWrapper>
          {tasteData.map((item, index) => {
            const keyIndex = index.toString();
            return (
              <li key={keyIndex}>
                <StyledTeasurveyButton
                  onClick={() => onTasteClick(index, item.data)}
                  $variantStyle={isTasteClicked === index ? VARIANTS.active : VARIANTS.default}
                >
                  <h2>{item.title}</h2>
                </StyledTeasurveyButton>
              </li>
            );
          })}
        </TeaSurveyButtonWrapper>
      </TeaSurveyWrapper>

      <TeaSurveyWrapper>
        <StyledTeaSurveyTitle>디카페인도 있어요.</StyledTeaSurveyTitle>
        <TeaSurveyButtonWrapper>
          {isDecafData.map((item, index) => {
            const keyIndex = index.toString();

            return (
              <li key={keyIndex}>
                <StyledTeasurveyButton
                  onClick={() => onIsDecafClick(index, item.data)}
                  $variantStyle={isDecafClicked === index ? VARIANTS.active : VARIANTS.default}
                >
                  <p>{item.content}</p>
                  <h2>{item.title}</h2>
                </StyledTeasurveyButton>
              </li>
            );
          })}
        </TeaSurveyButtonWrapper>
      </TeaSurveyWrapper>

      <TeaSurveyWrapper>
        <StyledTeaSurveyTitle>어느 가격까지 생각하시나요?</StyledTeaSurveyTitle>
        <TeaSurveyButtonWrapper>
          {priceData.map((item, index) => {
            const keyIndex = index.toString();

            return (
              <li key={keyIndex}>
                <StyledTeasurveyButton
                  onClick={() => onIsPriceClick(index, item.data)}
                  $variantStyle={isPriceClicked === index ? VARIANTS.active : VARIANTS.default}
                >
                  <h2>{item.title}</h2>
                </StyledTeasurveyButton>
              </li>
            );
          })}
        </TeaSurveyButtonWrapper>
      </TeaSurveyWrapper>

      <StyledTeaSurveyResult onClick={setLocalStorage}>
        <Button value="결과 확인하기" size="lg" variant="point" />
      </StyledTeaSurveyResult>
    </TeaSurveyLayer>
  );
};

export default TeaSurvey;

const TeaSurveyLayer = styled.div`
  width: 100%;
`;

const TeaSurveyWrapper = styled.section`
  padding: 80px 0;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const StyledTeaSurveyTitle = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 40px;
`;

const StyledTeaSurveyResult = styled.div``;

const TeaSurveyButtonWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  flex-wrap: wrap;

  li button h2 {
    font-size: 1.8rem;
    margin-top: 4px;
  }
  @media (max-width: 768px) {
    gap: 14px;
  }
`;

const StyledTeasurveyButton = styled.button<{ $variantStyle: RuleSet<object> }>`
  ${(props) => props.$variantStyle}

  width: 100%;
  padding: 60px 0;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;
