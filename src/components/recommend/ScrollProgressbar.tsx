import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const ScrollProgressbar = () => {
  const [filledWidth, setFilledWidth] = useState<number>(0);

  const handleScroll = useCallback((): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop === 0) {
      setFilledWidth(0);
    }

    const windowHeight: number = scrollHeight - clientHeight;
    const currentPercent: number = scrollTop / windowHeight;

    setFilledWidth(currentPercent * 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  return (
    <ScrollProgressbarLayer>
      <ScrollProgressbarContentWrapper>
        <StyledScrollProgressbar>
          <StyledScrollProgressbarFilled $filledWidth={filledWidth} />
        </StyledScrollProgressbar>
        <StyledScrollProgressbarText>
          <li>종류</li>
          <li>맛</li>
          <li>디카페인</li>
          <li>가격</li>
        </StyledScrollProgressbarText>
      </ScrollProgressbarContentWrapper>
    </ScrollProgressbarLayer>
  );
};
export default ScrollProgressbar;

const ScrollProgressbarLayer = styled.div`
  background-color: #fff;
  padding: 30px 0;
  margin: 0 auto;

  position: sticky;
  top: 8.4rem;
  left: 0;
  right: 0;
`;

const ScrollProgressbarContentWrapper = styled.div`
  width: 40vw;
  margin: 0 auto;
`;

const StyledScrollProgressbar = styled.div`
  height: 4px;
  background: var(--color-gray-100);

  border-radius: 20px;
  overflow: hidden;
`;

const StyledScrollProgressbarFilled = styled(StyledScrollProgressbar)<{ $filledWidth: number }>`
  width: ${(props) => props.$filledWidth}%;
  height: 100%;
  background-color: var(--color-sub-500);
`;
const StyledScrollProgressbarText = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-weight: var(--weight-bold);
`;
