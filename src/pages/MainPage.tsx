import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { styled, keyframes } from "styled-components";
import Firecracker from "@/components/common/Firecracker";

const MainPage = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchParams] = useSearchParams();
  const isNewMember = searchParams.get("welcome");

  const newUserWelcomeEffect = () => {
    if (isNewMember) {
      setShowConfetti(true);
    }
  };

  useEffect(() => {
    newUserWelcomeEffect();
  }, []);

  return (
    <div>
      {showConfetti && <Welcome />}
      {showConfetti && (
        <FirecrackerWrapper>
          <Firecracker setStyle="bigCenter" />
        </FirecrackerWrapper>
      )}
      메인페이지
    </div>
  );
};

/* 환영합니다 폭죽 스타일 */
const Welcome = () => {
  return (
    <WelcomeWrapper>
      <span>환영합니다</span>
    </WelcomeWrapper>
  );
};

export default MainPage;

const FirecrackerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const welcomeFadeInOut = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;

const WelcomeWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  left: 0;
  animation: ${welcomeFadeInOut} 3s ease-in-out forwards;
  span {
    font-size: 8rem;
    background-color: var(--color-white);
    height: 8rem;
    width: 40rem;
    text-align: center;
    align-content: center;
    font-weight: var(--weight-heavy);
    color: var(--color-sub-500);
    border-radius: 10px;
  }
`;
