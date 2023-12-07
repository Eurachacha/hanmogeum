import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import CancelIcon from "@/assets/icons/cancel.svg?react";
import CheckedBoxIcon from "@/assets/icons/checkedBox.svg?react";
import UncheckedBoxIcon from "@/assets/icons/uncheckedBox.svg?react";
import { CartItem as CartItemType } from "@/types/cart";
import CounterButton from "./CounterButton";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import cartApi from "@/apis/services/cart";
import { cartState } from "@/recoil/atoms/cartState";

interface CartItemProps {
  checkedItems: number[];
  toggleCheckBox: (_id: number) => void;
  handleDeleteItem: (_id: number) => void;
  data: CartItemType; // 로컬스토리지 데이터 || DB데이터
  idx: number;
}

const CartItem = ({ checkedItems, toggleCheckBox, handleDeleteItem, data, idx }: CartItemProps) => {
  const user = useRecoilValue(loggedInUserState);
  const setCartStorage = useSetRecoilState(cartState);
  const [quantityInput, setQuantityInput] = useState(data.quantity);
  const [cartItemPrice, setCartItemPrice] = useState(data.product.price * quantityInput);

  const updateQuantity = (_id: number, newQuantity: number) => {
    try {
      cartApi.updateQuantity(_id, { quantity: newQuantity });
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>, _id: number) => {
    const { value, valueAsNumber } = event.target;
    if (Number.isNaN(value) || value === "") {
      setQuantityInput(0);
      return;
    }
    if (valueAsNumber > data.product.quantity - data.product.buyQuantity) return;

    // 로그인 시
    if (user) {
      updateQuantity(_id, valueAsNumber);
      setQuantityInput(valueAsNumber);
      return;
    }
    // 비로그인 시
    const newCartItem = { ...data, quantity: valueAsNumber };
    setCartStorage((prev) => {
      const newCartStorage = [...prev];
      newCartStorage.splice(idx, 1, newCartItem);
      return newCartStorage;
    });
    setQuantityInput(valueAsNumber);
  };

  const handleMinus = (_id: number) => {
    // input상태가 1이라면 return
    if (quantityInput === 1) return;
    // 로그인 시
    if (user) {
      updateQuantity(_id, quantityInput - 1);
      setQuantityInput(quantityInput - 1);
      return;
    }
    // 비로그인 시
    const newCartItem = { ...data, quantity: quantityInput - 1 };
    setCartStorage((prev) => {
      const newCartStorage = [...prev];
      newCartStorage.splice(idx, 1, newCartItem);
      return newCartStorage;
    });
    setQuantityInput(quantityInput - 1);
  };

  const handlePlus = (_id: number) => {
    // input상태가 재고와 같다면 return
    if (quantityInput === data.product.quantity - data.product.buyQuantity) return;
    // 로그인 시
    if (user) {
      updateQuantity(_id, quantityInput + 1);
      setQuantityInput(quantityInput + 1);
      return;
    }
    // 비로그인 시
    const newCartItem = { ...data, quantity: quantityInput + 1 };
    setCartStorage((prev) => {
      const newCartStorage = [...prev];
      newCartStorage.splice(idx, 1, newCartItem);
      return newCartStorage;
    });
    setQuantityInput(quantityInput + 1);
  };

  useEffect(() => {
    setQuantityInput(data.quantity);
  }, [data]);

  useEffect(() => {
    setCartItemPrice(data.product.price * quantityInput);
  }, [quantityInput, data]);

  if (data)
    return (
      <CartItemLayer>
        <CartItemLeft>
          <CheckedBox onClick={() => toggleCheckBox(data._id)}>
            {checkedItems.includes(data._id) ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
          </CheckedBox>
          <ImageWrapper>
            <img src={data.product.image} alt={data.product.name} width="100%" height="100%" />
          </ImageWrapper>
          <ProductTitle>{data.product.name}</ProductTitle>
        </CartItemLeft>
        <CartItemRight>
          <CountPrice>
            <CounterLayer>
              <CounterButton handleQuantity={() => handleMinus(data._id)}>-</CounterButton>
              <QuantityWrapper
                type="number"
                min={1}
                max={data.product.quantity - data.product.buyQuantity}
                value={quantityInput}
                onChange={(event) => handleQuantity(event, data._id)}
              ></QuantityWrapper>
              <CounterButton handleQuantity={() => handlePlus(data._id)}>+</CounterButton>
            </CounterLayer>
            <Price>{cartItemPrice.toLocaleString()}원</Price>
          </CountPrice>
          <CancelIconWrapper style={{ width: 20, height: 20 }} onClick={() => handleDeleteItem(data._id)}>
            <CancelIcon />
          </CancelIconWrapper>
        </CartItemRight>
      </CartItemLayer>
    );
  return <p>상품이 없습니다!</p>;
};

export default CartItem;

const CartItemLayer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-gray-100);
  padding: 8px;
  flex-wrap: wrap;
`;

const CartItemLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 30%;
`;

const CheckedBox = styled.div`
  margin: 0 4px;
  padding: 0 4px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  max-width: 7rem;
  max-height: 7rem;
  min-width: 4rem;
  margin: 0 12px;
  flex: 0.3;
  border: 1px solid var(--color-gray-100);
  padding: 4px;
  margin: 8px;
`;

const ProductTitle = styled.p`
  font-size: 1.6rem;
  flex: 1;
  line-height: initial;
  padding-right: 1.2rem;
  min-width: 10rem;
`;

const CartItemRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
`;

const CountPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: auto;
`;

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

const Price = styled.p`
  font-size: 1.8rem;
  font-weight: var(--weight-bold);
  text-align: right;
  margin: 0 1rem;
  min-width: 10rem;
`;

const CancelIconWrapper = styled.div`
  margin: 0 4px;
  cursor: pointer;
`;
