import { useState } from "react";
import { styled } from "styled-components";
import QuantitySettingButton from "@/components/cart/QuantitySettingButton";

interface QuantityControllerProps {
  initQuantity: number;
  stock: number;
}

const QuantityContainer = ({ initQuantity, stock }: QuantityControllerProps) => {
  const [quantity, setQuantity] = useState(initQuantity);

  const handleMinus = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    if (quantity === stock) return;
    setQuantity(quantity + 1);
  };

  return (
    <QuantityContainerLayer>
      <QuantitySettingButton handleQuantity={handleMinus}>-</QuantitySettingButton>
      <QuantityWrapper
        type="number"
        max={stock}
        value={quantity}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuantity(Number(e.target.value));
        }}
      ></QuantityWrapper>
      <QuantitySettingButton handleQuantity={handlePlus}>+</QuantitySettingButton>
    </QuantityContainerLayer>
  );
};

export default QuantityContainer;

const QuantityContainerLayer = styled.div`
  width: 10rem;
  height: 4rem;
  margin: 0 8px;
  border: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /* Firefox */
  & input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const QuantityWrapper = styled.input`
  font-size: var(--size-20);
  width: 2rem;
  height: 2rem;
  text-align: center;
  border: none;
  flex: 1;

  &:focus {
    outline: none;
  }
`;
