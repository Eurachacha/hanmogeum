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

interface CartItemListContainerProps {
  cartData: CartItem[]; // DB장바구니 state
  setCartData: React.Dispatch<React.SetStateAction<CartItem[]>>; // DB장바구니 setState
}

const CartItemListContainer = ({ cartData, setCartData }: CartItemListContainerProps) => {
  const [isAllChecked, setIsAllChecked] = useState(true);
  const user = useRecoilValue(loggedInUserState);
  // 로컬 장바구니 상태
  const [cartStorage, setCartStorage] = useRecoilState(cartState);
  // 체크박스 상태
  const [checkedItems, setCheckedItems] = useRecoilState(cartCheckedItemState);

  // 재고 체크용 dryRun 구매요청
  const checkIsInStock = async (data: { _id: number; quantity: number }[]) => {
    try {
      const response = await cartApi.checkStockStates(data);
      const { products } = response.data.item;
      products.forEach((item) => {
        const targetIndex = cartStorage.findIndex((e) => e.product._id === item._id);
        if (item.quantityInStock !== cartStorage[targetIndex].stock) {
          const newCartStorageItem = { ...cartStorage[targetIndex], stock: item.quantityInStock };
          const newCartStorage = [...cartStorage];
          newCartStorage.splice(targetIndex, 1, newCartStorageItem);
          setCartStorage(newCartStorage);
        }
      });
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
    if (user) setCheckedItems(cartData.filter((item) => item.quantity !== 0).map((item) => item.product_id));
    else setCheckedItems(cartStorage.filter((item) => item.quantity !== 0).map((item) => item.product._id));
  };

  // [선택삭제]
  const handleDeleteChecked = () => {
    // 로그인 시
    if (user && cartData) {
      const newCartData = cartData.filter((item) => !checkedItems.includes(item.product_id));
      const newCartSummary = newCartData.map((item) => ({ _id: item.product_id, quantity: item.quantity }));
      replaceCarts({ products: newCartSummary });
      return;
    }
    if (!user) {
      // 비로그인 시
      const newCartData = cartStorage.filter((item) => !checkedItems.includes(item.product._id));
      setCartStorage(newCartData);
      setCheckedItems(newCartData.filter((item) => item.stock !== 0).map((item) => item.product._id));
    }
  };

  // 첫 렌더링 시 재고체크
  useEffect(() => {
    // - 로그인 시: cartData 내부 확인(CartItem 컴포넌트에서 체크)
    // - 비로그인 시 : cartStorage 데이터로 POST /carts/local 재고체크 요청
    if (!user) {
      const targetData = cartStorage.map((item) => {
        return {
          _id: item.product._id,
          quantity: item.quantity,
        };
      });
      checkIsInStock(targetData);
    }
  }, []);

  // 체크박스 상태가 바뀌면 모든 아이템이 체크되어있는지 확인
  useEffect(() => {
    // 로그인 시
    if (user)
      setIsAllChecked(
        checkedItems.length > 0 &&
          checkedItems.length ===
            cartData.filter((item) => item.product.quantity - item.product.buyQuantity !== 0).length,
      );
    // 비로그인 시
    else
      setIsAllChecked(
        checkedItems.length > 0 && checkedItems.length === cartStorage.filter((item) => item.stock !== 0).length,
      );
  }, [checkedItems]);

  useEffect(() => {
    if (user) {
      setCheckedItems(
        cartData
          .filter((item) => item.product.quantity - item.product.buyQuantity !== 0)
          .map((item) => item.product_id),
      );
      // 장바구니 DB의 item 개수가 바뀌면 cartStorage에 DB상태 반영
      const updatedCartStorage = cartData.map((item) => {
        return {
          quantity: item.quantity,
          stock: item.product.quantity - item.product.buyQuantity,
          product: {
            _id: item.product._id,
            name: item.product.name,
            image: item.product.image,
            price: item.product.price,
          },
        };
      });
      setCartStorage(updatedCartStorage);
    }
  }, [cartData.length]);

  return (
    <CartItemListContainerLayer>
      <ItemsHeader>
        <CheckAllButton onClick={handleAllChecked}>
          {isAllChecked ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
          <p>전체선택</p>
        </CheckAllButton>
        <DeleteCheckedButton onClick={handleDeleteChecked}>선택삭제</DeleteCheckedButton>
      </ItemsHeader>
      <CartItemContainer cartData={cartData} setCartData={setCartData} />
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
