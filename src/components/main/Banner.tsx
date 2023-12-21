import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";

const Banner = () => {
  const navigate = useNavigate();

  const moveToRecommendPage = () => {
    navigate("/recommend");
  };

  return (
    <BannerLayer>
      <StyledBannerTitle>내 취향의 차를 찾아보세요.</StyledBannerTitle>
      <StyledBannerButton onClick={moveToRecommendPage}>
        <Button value="추천 받으러 가기" size="sm" variant="point"></Button>
      </StyledBannerButton>
    </BannerLayer>
  );
};

export default Banner;

const BannerLayer = styled.div`
  padding: 80px 20px;
  background-color: #ffdccc;
`;

const StyledBannerTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: var(--weight-regular);
  margin-bottom: 20px;
`;
// TODO: button으로 변경 시 background 이슈
const StyledBannerButton = styled.div`
  width: 200px;
  background-color: none;
  border: none;
  box-sizing: border-box;
`;
