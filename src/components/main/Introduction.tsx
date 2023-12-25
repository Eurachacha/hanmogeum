import styled from "styled-components";

const Introduction = () => {
  return (
    <IntroductionLayer>
      <IntroductionWrapper>
        <img src="/images/tea.png" alt="tea" />

        <h3>나만의 차</h3>
        <p>내가 원하는 맛만 골라서</p>
      </IntroductionWrapper>
      <IntroductionWrapper>
        <img src="/images/heart.png" alt="health" />

        <h3>건강한 취미</h3>
        <p>건강하게 자란 유기농 잎</p>
      </IntroductionWrapper>
      <IntroductionWrapper>
        <img src="/images/clock.png" alt="fast" />

        <h3>편리한 선택</h3>
        <p>10초만에 알 수 있는 차 추천!</p>
      </IntroductionWrapper>
    </IntroductionLayer>
  );
};

export default Introduction;

const IntroductionLayer = styled.ul`
  display: flex;
  justify-content: space-around;
  margin: 100px auto;
`;

const IntroductionWrapper = styled.li`
  text-align: center;

  img {
    width: 50px;
  }

  h3 {
    font-size: 2.4rem;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  p {
    color: var(--color-gray-300);
  }

  @media (max-width: 768px) {
    img {
      width: 40px;
    }
    h3 {
      font-size: 2rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
`;
