import { styled } from "styled-components";
import { useState } from "react";
import CartItemListContainer from "@/containers/cart/CartItemListContainer";
import CartPriceContainer from "@/containers/cart/CartPriceContainer";
import { CartItem } from "@/types/cart";

const CartPage = () => {
  // TODO: CartPrice내에서 로그인 여부 recoil 상태에 따라 처리하고 useState 지우기
  const [cartItems, setCartItems] = useState<CartItem[]>();
  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <Content>
        <CartItemListContainer />
        <CartPriceContainer cartItems={cartItems} />
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
