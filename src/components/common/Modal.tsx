import { PropsWithChildren } from "react";
import styled from "styled-components";
import CircleCheckIcon from "@/assets/icons/circleCheck.svg?react";

interface ModalProps {
  isOpen: boolean;
  iconRequired?: boolean;
  message: string;
}

const Modal = ({ isOpen, iconRequired = false, message, children }: PropsWithChildren<ModalProps>) => {
  return (
    <WholeContainer $isOpen={isOpen}>
      <ModalContainer>
        {iconRequired && (
          <IconWrapper>
            <CircleCheckIcon />
          </IconWrapper>
        )}
        <MessageWrapper>{message}</MessageWrapper>
        {children}
      </ModalContainer>
    </WholeContainer>
  );
};

export default Modal;

const WholeContainer = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  background-color: #3c3c3c9d;
  width: 100%;
  height: 100vh;

  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalContainer = styled.div`
  box-sizing: border-box;

  width: 30rem;
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 150;
  position: absolute;
  top: 20%;
`;

const IconWrapper = styled.div`
  color: var(--color-sub-500);
  margin-bottom: 1rem;
`;

const MessageWrapper = styled.p`
  margin-top: 1rem;
  margin-bottom: 2.4rem;
`;
