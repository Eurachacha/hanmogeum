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
        <h2>내 취향의 차를 찾고 싶다면?</h2>
        <Button value="차 추천 받으러 가기 >" size="sm" variant="point" />
      </BannerTextWrapper>
    </BannerLayer>
  );
};

export default Banner;

const BannerLayer = styled.div`
  background-color: #fbf6f2;
  padding: 30px 0 30px 40px;
  cursor: pointer;
`;

const BannerTextWrapper = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 2rem;
    margin-right: 20px;
  }
  p {
    margin: 12px 0 24px 0;
  }
  button {
    width: 200px;
  }
`;
