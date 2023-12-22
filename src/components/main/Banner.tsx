import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";

const Banner = () => {
  const navigate = useNavigate();

  const moveToRecommendPage = () => {
    navigate("/recommend");
  };

  return (
    <BannerLayer onClick={moveToRecommendPage}>
      <BannerTextWrapper>
        <h2>내 취향에 차를 알고 싶다면?</h2>
        <p>한모금에서 입맛에 맞는 차를 찾아드려요.</p>
        <Button value="차 추천 받기" size="sm" variant="point" />
      </BannerTextWrapper>
    </BannerLayer>
  );
};

export default Banner;

const BannerLayer = styled.div`
  background-color: #f9f7e8;
  height: 200px;
`;

const BannerTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-top: 40px;
    font-size: 2.4rem;
  }
  p {
    margin: 12px 0 24px 0;
  }
  button {
    width: 200px;
  }
`;
