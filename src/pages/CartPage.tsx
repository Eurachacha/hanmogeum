import { styled } from "styled-components";
import { useEffect, useState } from "react";
import CartItemListContainer, { CartItemInfo } from "@/containers/CartItemListContainer";
import PriceInfoContainer from "@/containers/PriceInfoContainer";
import CART_STORAGE_KEY from "@/constants/cart";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemInfo[]>([]);

  useEffect(() => {
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
        quantity: 1,
        mainImages: ["https://localhost:443/uploads/sample-classic.jpg"],
      },
    ];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(mockCartItems));

    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (cartData) setCartItems(JSON.parse(cartData));
  }, []);

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <Content>
        <CartItemListContainer cartItems={cartItems} setCartItems={setCartItems} />
        <PriceInfoContainer cartItems={cartItems} />
      </Content>
    </>
  );
};

export default CartPage;

const PageTitle = styled.section`
  color: var(--color-main);
  font-size: 3rem;
  font-weight: var(--weight-bold);
  padding: 30px 10px;
`;

const Content = styled.section`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
