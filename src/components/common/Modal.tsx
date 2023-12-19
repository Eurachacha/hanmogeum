import { PropsWithChildren } from "react";
import styled from "styled-components";
import CircleCheckIcon from "@/assets/icons/circleCheck.svg?react";

interface ModalProps {
  isOpen: boolean;
  iconRequired?: boolean;
  targetString?: string;
  message: string;
}

const Modal = ({ isOpen, iconRequired = false, targetString, message, children }: PropsWithChildren<ModalProps>) => {
  return (
    <WholeContainer $isOpen={isOpen}>
      <ModalContainer>
        {iconRequired && (
          <IconWrapper>
            <CircleCheckIcon />
          </IconWrapper>
        )}
        {targetString && (
          <BoldText>
            {targetString.split("\\n").map((str, idx) => {
              const keyIndex = idx.toString() + str;
              return (
                <span key={keyIndex}>
                  {str}
                  <br />
                </span>
              );
            })}
          </BoldText>
        )}
        <MessageWrapper>
          {message.split("\\n").map((str, idx) => {
            const keyIndex = idx.toString() + str;
            return (
              <span key={keyIndex}>
                {str}
                <br />
              </span>
            );
          })}
        </MessageWrapper>
        <ButtonArea>{children}</ButtonArea>
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

const BoldText = styled.div`
  font-weight: var(--weight-bold);
`;

const MessageWrapper = styled.p`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2.4rem;

  span {
    display: block;
    margin: 4px 0;
  }
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
