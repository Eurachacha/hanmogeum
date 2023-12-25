import styled from "styled-components";
import ScrollProgressbar from "@/components/recommend/ScrollProgressbar";
import TeaSurvey from "@/components/recommend/TeaSurvey";

const RecommendPage = () => {
  return (
    <RecommendPageLayer>
      <ScrollProgressbar />
      <TeaSurvey />
    </RecommendPageLayer>
  );
};

export default RecommendPage;

const RecommendPageLayer = styled.div`
  width: 40vw;
  margin: 0 auto;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 80vw;
  }
`;
