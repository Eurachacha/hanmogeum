import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../common/Button";

const TeaSurvey = () => {
  const navigate = useNavigate();

  // TODO: 단계 정리
  // 1. 선택한 버튼에 따라 localStorage에 객체를 저장한다.
  const [pack, setpack] = useState("");
  const [taste, setTaste] = useState("");
  const [isDecaf, setIsDecaf] = useState(false);
  const [price, setPrice] = useState(0);

  const setLocalStorage = () => {
    const surveyResult = { pack: pack, taste: taste, isDecaf: isDecaf, price: price };
    localStorage.setItem("surveyResult", JSON.stringify(surveyResult));
    navigate("/surveyresult");
  };

  return (
    <div>
      <TeaSurveyWrapper>
        <StyledTeaSurveyTitle>어떤 종류를 선호하시나요?</StyledTeaSurveyTitle>
        <TeaSurveyButtonWrapper>
          <li>
            <button onClick={() => setpack("PC0101")}>
              <p>간편하게 우리는</p>
              <h2>티백</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setpack("PC0102")}>
              <p>눈이 즐거운</p>
              <h2>잎차</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setpack("PC0103")}>
              <p>속이 든든한</p>
              <h2>분말</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setpack("PC0104")}>
              <p>차갑게 마시기 좋은</p>
              <h2>음료/원액</h2>
            </button>
          </li>
        </TeaSurveyButtonWrapper>
      </TeaSurveyWrapper>

      <TeaSurveyWrapper>
        <StyledTeaSurveyTitle>어떤 맛을 선호하시나요?</StyledTeaSurveyTitle>
        <TeaSurveyButtonWrapper>
          <li>
            <button onClick={() => setTaste("PC0401")}>
              <h2>달콤한</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setTaste("PC0402")}>
              <h2>새콤한</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setTaste("PC0403")}>
              <h2>씁쓸한</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setTaste("PC0404")}>
              <h2>고소한</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setTaste("PC0405")}>
              <h2>깔끔한</h2>
            </button>
          </li>
        </TeaSurveyButtonWrapper>
      </TeaSurveyWrapper>

      <TeaSurveyWrapper>
        <StyledTeaSurveyTitle>디카페인도 있어요.</StyledTeaSurveyTitle>
        <TeaSurveyButtonWrapper>
          <li>
            <button onClick={() => setIsDecaf(true)}>
              <p>밤에도 부담 없는</p>
              <h2>디카페인</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setIsDecaf(false)}>
              <p>기운 나는</p>
              <h2>카페인</h2>
            </button>
          </li>
        </TeaSurveyButtonWrapper>
      </TeaSurveyWrapper>

      <TeaSurveyWrapper>
        <StyledTeaSurveyTitle>어느 가격까지 생각하시나요?</StyledTeaSurveyTitle>
        <TeaSurveyButtonWrapper>
          <li>
            <button onClick={() => setPrice(100000)}>
              <h2>10000원 이하</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setPrice(200000)}>
              <h2>20000원 이하</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setPrice(300000)}>
              <h2>30000원 이하</h2>
            </button>
          </li>

          <li>
            <button onClick={() => setPrice(1000000)}>
              <h2>모든 가격</h2>
            </button>
          </li>
        </TeaSurveyButtonWrapper>
      </TeaSurveyWrapper>

      <StyledTeaSurveyResult onClick={setLocalStorage}>
        <Button value="결과 확인하기" size="lg" variant="point" />
      </StyledTeaSurveyResult>
    </div>
  );
};

export default TeaSurvey;

const TeaSurveyWrapper = styled.section`
  padding: 80px 0;
  text-align: center;
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

  li button {
    width: 100%;
    padding: 60px 0;

    background: none;
    border: 1px solid var(--color-sub-500);
    border-radius: 4px;

    cursor: pointer;
  }
  li button h2 {
    font-size: 1.8rem;
    margin-top: 4px;
  }
`;
