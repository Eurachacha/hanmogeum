import { PropsWithChildren } from "react";
import styled from "styled-components";

interface ButtonProps {
  handleQuantity: () => void;
}

const CounterButton = ({ handleQuantity, children }: PropsWithChildren<ButtonProps>) => {
  return <ButtonContainer onClick={handleQuantity}>{children}</ButtonContainer>;
};

export default CounterButton;

const ButtonContainer = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-300);
  width: 30px;
  font-size: var(--size-20);
  cursor: pointer;
`;
