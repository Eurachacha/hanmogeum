import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CheckedBoxIcon from "@/assets/icons/checkedBox.svg?react";
import UncheckedBoxIcon from "@/assets/icons/uncheckedBox.svg?react";
import CartItemContainer from "./CartItemContainer";
import { cartState, cartCheckedItemState } from "@/recoil/atoms/cartState";
import { CartItem, CartItemSummary } from "@/types/cart";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import cartApi from "@/apis/services/cart";

const CartItemListContainer = () => {
  const [isAllChecked, setIsAllChecked] = useState(true);
  const user = useRecoilValue(loggedInUserState);
  // 로컬 장바구니 상태
  const [cartStorage, setCartStorage] = useRecoilState(cartState);
  // DB 장바구니 상태
  const [cartData, setCartData] = useState<CartItem[]>([]);
  // 체크박스 상태
  const [checkedItems, setCheckedItems] = useRecoilState(cartCheckedItemState);

  const fetchCartItems = async () => {
    try {
      const response = await cartApi.getAllItems();
      const { item } = response.data;
      setCartData(item);
    } catch (error) {
      console.error(error);
    }
  };

  const replaceCarts = async (newCart: { products: CartItemSummary[] }) => {
    try {
      const response = await cartApi.replaceCarts(newCart);
      const { item } = response.data;
      setCartData(item);
    } catch (error) {
      console.error(error);
    }
  };

  // [전체선택버튼 토글]
  const handleAllChecked = () => {
    if (isAllChecked) {
      setCheckedItems([]);
      return;
    }
    if (user) setCheckedItems(cartData.map((item) => item._id));
    else setCheckedItems(cartStorage.map((item) => item._id));
  };

  // [선택삭제]
  // 로그인 상태 - 백엔드 요청 / 로그아웃 상태 - recoil 상태 변경
  const handleDeleteChecked = () => {
    // 로그인 시
    if (user && cartData) {
      const newCartData = cartData.filter((item) => !checkedItems.includes(item._id));
      const newCartSummary = newCartData.map((item) => ({ _id: item.product_id, quantity: item.quantity }));
      replaceCarts({ products: newCartSummary });
      return;
    }
    // 비로그인 시
    const newCartData = cartStorage.filter((item) => !checkedItems.includes(item._id));
    setCartStorage(newCartData);
  };

  // 초기 렌더링 시 로그인 상태면 카트 데이터 GET 요청, checkedItems 배열에 모든 product 추가
  useEffect(() => {
    if (user) fetchCartItems();
  }, []);

  useEffect(() => {
    if (user) {
      setCheckedItems([...cartData].map((item) => item._id));
    } else setCheckedItems([...cartStorage].map((item) => item._id));
  }, [cartData]);

  // 체크박스 상태가 바뀌면 모든 아이템이 체크되어있는지 확인
  useEffect(() => {
    if (user) setIsAllChecked(checkedItems.length > 0 && checkedItems.length === cartData.length);
    else setIsAllChecked(checkedItems.length > 0 && checkedItems.length === cartStorage.length);
  }, [checkedItems]);

  return (
    <CartItemListContainerLayer>
      <ItemsHeader>
        <CheckAllButton onClick={handleAllChecked}>
          {isAllChecked ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
          <p>전체선택</p>
        </CheckAllButton>
        <DeleteCheckedButton onClick={handleDeleteChecked}>선택삭제</DeleteCheckedButton>
      </ItemsHeader>
      <CartItemContainer cartData={user ? cartData : []} setCartData={setCartData} />
    </CartItemListContainerLayer>
  );
};

export default CartItemListContainer;

const CartItemListContainerLayer = styled.div`
  margin: 2rem 0;
  flex: 1;
`;

const ItemsHeader = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-gray-100);
`;

const CheckAllButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;

  & p {
    margin: 0 4px;
    color: var(--color-gray-400);
    font-size: 1.4rem;
  }
`;

const DeleteCheckedButton = styled.button`
  border: none;
  background: none;
  color: var(--color-gray-300);
  cursor: pointer;
  font-size: 1.4rem;
`;
