import { styled } from "styled-components";
import QuantitySettingButton from "@/components/cart/QuantitySettingButton";

interface QuantityControllerProps {
  stock: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const CounterContainer = ({ stock, quantity, setQuantity }: QuantityControllerProps) => {
  const handleMinus = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    if (quantity === stock) return;
    setQuantity(quantity + 1);
  };

  return (
    <CounterLayer>
      <QuantitySettingButton handleQuantity={handleMinus}>-</QuantitySettingButton>
      <QuantityWrapper
        type="number"
        maxLength={stock}
        value={quantity}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuantity(Number(e.target.value));
        }}
      ></QuantityWrapper>
      <QuantitySettingButton handleQuantity={handlePlus}>+</QuantitySettingButton>
    </CounterLayer>
  );
};

export default CounterContainer;

const CounterLayer = styled.div`
  width: 10rem;
  height: 3.5rem;
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
  font-size: var(--size-16);
  padding: 0;
  width: 3rem;
  height: 2rem;
  text-align: center;
  border: none;
  flex: 1;

  &:focus {
    outline: none;
  }
`;
