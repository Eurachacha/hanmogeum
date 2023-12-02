import { styled } from "styled-components";
import { useEffect, useState } from "react";
import CartItem from "@/components/cart/CartItem";
import CheckedBoxIcon from "@/assets/icons/checkedBox.svg?react";
import UncheckedBoxIcon from "@/assets/icons/uncheckedBox.svg?react";
import CART_STORAGE_KEY from "@/constants/cart";

export interface CartItemInfo {
  checked: boolean;
  product_id: number;
  price: number;
  shippingFees: number;
  name: string;
  mainImages: string[];
  stock: number;
  quantity: number;
}

interface CartItemsContainerProps {
  cartItems: CartItemInfo[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemInfo[]>>;
}

const CartItemsContainer = ({ cartItems, setCartItems }: CartItemsContainerProps) => {
  const [isAllChecked, setIsAllChecked] = useState(true);

  const handleAllChecked = () => {
    const newCartData = [...cartItems].map((item) => ({ ...item, checked: !isAllChecked }));
    setCartItems(newCartData);
  };

  useEffect(() => {
    setIsAllChecked(cartItems.every((item) => item.checked === true));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartItemsLayer>
      <ItemsHeader>
        <CheckAllButton onClick={handleAllChecked}>
          {isAllChecked ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
          <p>전체선택</p>
        </CheckAllButton>
        <DeleteCheckedButton>선택삭제</DeleteCheckedButton>
      </ItemsHeader>
      {cartItems.map((item, idx) => {
        const itemKey = idx.toString();
        return <CartItem key={itemKey} data={item} cartItems={cartItems} setCartItems={setCartItems} />;
      })}
    </CartItemsLayer>
  );
};

export default CartItemsContainer;

const CartItemsLayer = styled.div`
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
