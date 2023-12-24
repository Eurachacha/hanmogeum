import styled, { keyframes } from "styled-components";

// Keyframes for the animation
const animloader = keyframes`
  0% {
    box-shadow: 2px 0px rgba(210, 89, 37, 0), 12px 0px rgba(210, 89, 37, 0.3), 20px 0px rgba(210, 89, 37, 0);
  }
  50% {
    box-shadow: 2px -5px rgba(210, 89, 37, 0.5), 12px -3px rgba(210, 89, 37, 0.5), 20px -2px rgba(210, 89, 37, 0.6);
  }
  100% {
    box-shadow: 2px -8px rgba(210, 89, 37, 0), 12px -5px rgba(210, 89, 37, 0), 20px -5px rgba(210, 89, 37, 0);
  }
`;

// Styled loader component
const Loader = styled.div`
  width: 4.8rem;
  height: 4rem;
  margin-top: 3rem;
  display: inline-block;
  position: relative;
  background: #d25925;
  border-radius: 15% 15% 35% 35%;

  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 4.5rem;
    top: 0.8rem;
    border: 4px solid #d25925;
    width: 1.6rem;
    height: 2rem;
    border-radius: 0 4px 4px 0;
  }

  &::before {
    content: "";
    position: absolute;
    width: 0.1rem;
    height: 1rem;
    top: -1.5rem;
    left: 1.1rem;
    box-sizing: border-box;
    animation: ${animloader} 1s ease infinite;
  }
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* z-index: 2000; */
  & > div {
    margin-top: 20rem;
  }
`;

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <Loader />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
