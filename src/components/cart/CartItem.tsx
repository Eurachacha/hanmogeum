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
import { cartCheckedItemState, cartState } from "@/recoil/atoms/cartState";
import useQuantityCounter from "@/hooks/useQuantityCounter";

interface CartItemProps {
  setCartData: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  handleDeleteItem: (_id: number, product_id: number) => void;
  data: CartStorageItem | CartItemType; // 로컬스토리지 데이터 || DB데이터
  idx: number;
}

const isLocalData = (object: CartStorageItem | CartItemType) => {
  return typeof (object as CartItemType)._id === undefined;
};

const CartItem = ({ setCartData, handleDeleteItem, data, idx }: CartItemProps) => {
  const user = useRecoilValue(loggedInUserState);
  const setCartStorage = useSetRecoilState(cartState);
  const [checkedItems, setCheckedItems] = useRecoilState(cartCheckedItemState);
    data.quantity,
    user
      ? (data as CartItemType).product.quantity - (data as CartItemType).product.buyQuantity
      : (data as CartStorageItem).stock,
  );
  const [cartItemPrice, setCartItemPrice] = useState(data.product.price * quantityInput);

  const updateQuantity = (_id: number, newQuantity: number) => {
    try {
      cartApi.updateQuantity(_id, { quantity: newQuantity });
    } catch (error) {
      console.error(error);
    }
  };

      setCheckedItems((prev) => [...prev, product_id]);
  useEffect(() => {
    setCartItemPrice(data.product.price * quantityInput);
  }, [quantityInput, data]);

  useEffect(() => {
    if (user) setQuantityInputAsStock((data as CartItemType).quantity);
    else setQuantityInputAsStock((data as CartStorageItem).quantity);
  }, []);

  useEffect(() => {
    // 로그인 시 (data가 DB데이터인 경우)
    if (user && !isLocalData(data)) {
      const cartData = data as CartItemType;
      const newCartItem = { ...cartData, quantity: quantityInput };
      updateQuantity(cartData._id, quantityInput);
      setCartData((prev) => {
        const newCartData = [...prev];
        newCartData.splice(idx, 1, newCartItem);
        return newCartData;
      });
      return;
    }
    // 비로그인 시 (data가 로컬스토리지 데이터인 경우)
    const cartStorage = data as CartStorageItem;
    const newCartStorageItem = { ...cartStorage, quantity: quantityInput };
    setCartStorage((prev) => {
      const newCartStorage = [...prev];
      newCartStorage.splice(idx, 1, newCartStorageItem);
      return newCartStorage;
    });
  }, [quantityInput]);

  if (data)
    return (
      <CartItemLayer>
        <CartItemLeft>
          <CheckedBox onClick={() => toggleCheckBox(data.product._id)} disabled={quantityInput <= 0}>
            {quantityInput > 0 && checkedItems.includes(data.product._id) ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
          </CheckedBox>
          <ImageWrapper>
            <img src={data.product.image} alt={data.product.name} width="100%" height="100%" />
          </ImageWrapper>
          <ProductTitle>{data.product.name}</ProductTitle>
        </CartItemLeft>
        <CartItemRight>
          <CountPrice>
            <CounterLayer>
              <CounterButton handleQuantity={() => handleQuantityInput("minus")}>-</CounterButton>
              <QuantityWrapper
                type="number"
                max={
                  user
                    ? (data as CartItemType).product.quantity - (data as CartItemType).product.buyQuantity
                    : (data as CartStorageItem).stock
                }
                value={quantityInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityInput("", event)}
              ></QuantityWrapper>
              <CounterButton handleQuantity={() => handleQuantityInput("plus")}>+</CounterButton>
            </CounterLayer>
            <Price>{cartItemPrice.toLocaleString()}원</Price>
            {(data as CartStorageItem).stock < (data as CartStorageItem).quantity ? <p>재고반영됨</p> : null}
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

const CheckedBox = styled.button`
  border: none;
  background: none;
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
