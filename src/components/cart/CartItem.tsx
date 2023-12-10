import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import CancelIcon from "@/assets/icons/cancel.svg?react";
import CheckedBoxIcon from "@/assets/icons/checkedBox.svg?react";
import UncheckedBoxIcon from "@/assets/icons/uncheckedBox.svg?react";
import { CartItem as CartItemType, CartStorageItem } from "@/types/cart";
import CounterButton from "./CounterButton";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import cartApi from "@/apis/services/cart";
import { cartState } from "@/recoil/atoms/cartState";

interface CartItemProps {
  setCartData: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  checkedItems: number[];
  toggleCheckBox: (product_id: number) => void;
  handleDeleteItem: (_id: number, product_id: number) => void;
  data: CartStorageItem | CartItemType; // 로컬스토리지 데이터 || DB데이터
  idx: number;
}

const isLocalData = (object: CartStorageItem | CartItemType) => {
  return typeof (object as CartItemType)._id === undefined;
};

const CartItem = ({ setCartData, checkedItems, toggleCheckBox, handleDeleteItem, data, idx }: CartItemProps) => {
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

    // 로그인 시 (data가 DB데이터인 경우)
    if (user && !isLocalData(data)) {
      const cartData = data as CartItemType;
      if (valueAsNumber > cartData.product.quantity - cartData.product.buyQuantity) return;
      const newCartItem = { ...cartData, quantity: valueAsNumber };
      updateQuantity(_id, valueAsNumber);
      setQuantityInput(valueAsNumber);
      setCartData((prev) => {
        const newCartStorage = [...prev];
        newCartStorage.splice(idx, 1, newCartItem);
        return newCartStorage;
      });
      return;
    }
    // 비로그인 시 (data가 로컬스토리지 데이터인 경우)
    const cartStorage = data as CartStorageItem;
    const newCartStorageItem = { ...cartStorage, quantity: valueAsNumber };
    setCartStorage((prev) => {
      const newCartStorage = [...prev];
      newCartStorage.splice(idx, 1, newCartStorageItem);
      return newCartStorage;
    });
    setQuantityInput(valueAsNumber);
  };

  const handleMinus = (_id: number) => {
    // input상태가 1이라면 return
    if (quantityInput === 1) return;

    // 로그인 시 (data가 DB데이터인 경우)
    if (user && !isLocalData(data)) {
      const cartData = data as CartItemType;
      const newCartItem = { ...cartData, quantity: quantityInput - 1 };
      updateQuantity(_id, quantityInput - 1);
      setQuantityInput(quantityInput - 1);
      setCartData((prev) => {
        const newCartStorage = [...prev];
        newCartStorage.splice(idx, 1, newCartItem);
        return newCartStorage;
      });
      return;
    }
    // 비로그인 시 (data가 로컬스토리지 데이터인 경우)
    const cartStorage = data as CartStorageItem;
    const newCartStorageItem = { ...cartStorage, quantity: quantityInput - 1 };
    setCartStorage((prev) => {
      const newCartStorage = [...prev];
      newCartStorage.splice(idx, 1, newCartStorageItem);
      return newCartStorage;
    });
    setQuantityInput(quantityInput - 1);
  };

  const handlePlus = (_id: number) => {
    // 로그인 시 (data가 DB데이터인 경우)
    if (user && !isLocalData(data)) {
      const cartData = data as CartItemType;
      const newCartItem = { ...cartData, quantity: quantityInput + 1 };
      // input상태가 재고와 같다면 return
      if (quantityInput === cartData.product.quantity - cartData.product.buyQuantity) return;
      updateQuantity(_id, quantityInput + 1);
      setQuantityInput(quantityInput + 1);
      setCartData((prev) => {
        const newCartStorage = [...prev];
        newCartStorage.splice(idx, 1, newCartItem);
        return newCartStorage;
      });
      return;
    }
    // 비로그인 시
    const cartStorage = data as CartStorageItem;
    const newCartStorageItem = { ...cartStorage, quantity: quantityInput + 1 };
    setCartStorage((prev) => {
      const newCartStorage = [...prev];
      newCartStorage.splice(idx, 1, newCartStorageItem);
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
          <CheckedBox onClick={() => toggleCheckBox(data.product._id)}>
            {checkedItems.includes(data.product._id) ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
          </CheckedBox>
          <ImageWrapper>
            <img src={data.product.image} alt={data.product.name} width="100%" height="100%" />
          </ImageWrapper>
          <ProductTitle>{data.product.name}</ProductTitle>
        </CartItemLeft>
        <CartItemRight>
          <CountPrice>
            <CounterLayer>
              <CounterButton handleQuantity={() => handleMinus(user ? (data as CartItemType)._id : -1)}>
                -
              </CounterButton>
              <QuantityWrapper
                type="number"
                min={1}
                max={
                  user ? (data as CartItemType).product.quantity - (data as CartItemType).product.buyQuantity : 10
                } /* TODO: dryRun 에러 형태 확정시 반영 */
                value={quantityInput}
                onChange={(event) => handleQuantity(event, user ? (data as CartItemType)._id : -1)}
              ></QuantityWrapper>
              <CounterButton handleQuantity={() => handlePlus(user ? (data as CartItemType)._id : -1)}>+</CounterButton>
            </CounterLayer>
            <Price>{cartItemPrice.toLocaleString()}원</Price>
          </CountPrice>
          <CancelIconWrapper
            style={{ width: 20, height: 20 }}
            onClick={() => handleDeleteItem((data as CartItemType)._id, data.product._id)}
          >
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
