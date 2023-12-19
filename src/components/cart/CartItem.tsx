import { styled } from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  const { handleQuantityInput, quantityInput, setQuantityInputAsStock, updated } = useQuantityCounter(
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

  // [단일상품 체크박스 토글]
  const toggleCheckBox = (product_id: number) => {
    if (checkedItems.includes(product_id)) setCheckedItems(checkedItems.filter((item) => item !== product_id));
    else {
      setCheckedItems((prev) => [...prev, product_id]);
      if (data.quantity === 0) handleQuantityInput("plus");
    }
  };

  useEffect(() => {
    setCartItemPrice(data.product.price * quantityInput);
  }, [quantityInput, data]);

  // 초기렌더링 시
  useEffect(() => {
    if (user) setQuantityInputAsStock((data as CartItemType).quantity);
    else setQuantityInputAsStock((data as CartStorageItem).quantity);
  }, []);

  // [로그인 유저] 자동반영된 재고가 0인 경우 체크박스 해제
  useEffect(() => {
    if (user) {
      if ((data as CartItemType).quantity === 0) {
        setCheckedItems((prev) => prev.filter((product_id) => product_id !== (data as CartItemType).product._id));
      }
    }
  }, [(data as CartItemType).quantity]);

  // [비로그인 유저] 재고가 부족한 경우 input에 재고 반영
  useEffect(() => {
    if ((data as CartStorageItem).stock < (data as CartStorageItem).quantity) {
      setQuantityInputAsStock((data as CartStorageItem).quantity);
    }
  }, [(data as CartStorageItem).stock]);

  useEffect(() => {
    if (quantityInput > 0 && !checkedItems.includes(data.product._id))
      setCheckedItems((prev) => [...prev, data.product._id]);
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
    if (quantityInput === 0) {
      setCheckedItems((prev) => prev.filter((product_id) => product_id !== cartStorage.product._id));
    }
  }, [quantityInput]);

  if (data)
    return (
      <CartItemLayer>
        <CartItemLeft>
          <CheckedBox
            onClick={() => toggleCheckBox(data.product._id)}
            disabled={
              (user && (data as CartItemType).product.quantity - (data as CartItemType).product.buyQuantity === 0) ||
              (!user && (data as CartStorageItem).stock === 0)
            }
          >
            {quantityInput > 0 && checkedItems.includes(data.product._id) ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
          </CheckedBox>
          <ImageWrapper>
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${data.product.image.url}`}
              alt={data.product.name}
              width="100%"
              height="100%"
            />
          </ImageWrapper>
          <ProductTitle>{data.product.name}</ProductTitle>
        </CartItemLeft>
        <CartItemRight>
          <CountPrice>
            <StockInfo>
              재고:{" "}
              {user
                ? (data as CartItemType).product.quantity - (data as CartItemType).product.buyQuantity
                : (data as CartStorageItem).stock}
              개
            </StockInfo>
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
          </CountPrice>
          {updated ? <InfoMessage>재고 부족으로 최대 구매 가능 수량이 반영되었습니다.</InfoMessage> : null}
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

  position: relative;
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

const StockInfo = styled.p`
  color: var(--color-gray-300);
  min-width: 100px;
  font-size: 1.2rem;
  text-align: center;
  position: absolute;
  top: -15px;
  right: calc(-208-(100vw)) px;
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

const InfoMessage = styled.p`
  width: max-content;
  font-size: 1.2rem;
  color: var(--color-red);
  position: absolute;
  top: 44px;
  right: 130px;
`;

const CancelIconWrapper = styled.div`
  margin: 0 4px;
  cursor: pointer;
`;
