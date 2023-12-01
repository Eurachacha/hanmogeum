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

const mockCartItems = [
  {
    checked: true,
    product_id: 1,
    price: 9800,
    shippingFees: 0,
    name: "실속 분말 녹차",
    stock: 15,
    quantity: 1,
    mainImages: ["https://localhost:443/uploads/sample-dog.jpg"],
  },
  {
    checked: true,
    product_id: 2,
    price: 12000,
    shippingFees: 0,
    name: "루이보스 차",
    stock: 5,
    quantity: 3,
    mainImages: ["https://localhost:443/uploads/sample-dog.jpg"],
  },
];

localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(mockCartItems));

const CartItemsContainer = () => {
  const [cartItems, setCartItems] = useState<CartItemInfo[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(true);

  const handleAllChecked = () => {
    const newCartData = [...cartItems].map((item) => ({ ...item, checked: !isAllChecked }));
    setCartItems(newCartData);
  };

  useEffect(() => {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (cartData) setCartItems(JSON.parse(cartData));
  }, []);

  useEffect(() => {
    setIsAllChecked(cartItems.every((item) => item.checked === true));
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
      {cartItems.map((item) => (
        <CartItem
          key={new Date().getTime() + item.product_id}
          data={item}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ))}
    </CartItemsLayer>
  );
};

export default CartItemsContainer;

const CartItemsLayer = styled.section`
  margin: 2rem 0;
  max-width: 830px;
`;

const ItemsHeader = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid var(--color-gray-100);
`;

const CheckAllButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  & p {
    margin: 0 4px;
    color: var(--color-gray-400);
  }
`;

const DeleteCheckedButton = styled.button`
  border: none;
  background: none;
  color: var(--color-gray-300);
  cursor: pointer;
  font-size: 1.4rem;
`;
