import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CartItemListContainer from "@/containers/cart/CartItemListContainer";
import CartPriceContainer from "@/containers/cart/CartPriceContainer";
import { CartItem } from "@/types/cart";
import cartApi from "@/apis/services/cart";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";

const CartPage = () => {
  const user = useRecoilValue(loggedInUserState);
  const [cartData, setCartData] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      const response = await cartApi.getAllItems();
      const { item } = response.data;
      setCartData(item);
    } catch (error) {
      console.error(error);
    }
  };

  // 초기 렌더링 시 로그인 상태면 카트 데이터 GET 요청
  useEffect(() => {
    if (user) fetchCartItems();
  }, []);

  return (
    <div>
      <PageTitle>장바구니</PageTitle>
      <Content>
        <CartItemListContainer cartData={cartData} setCartData={setCartData} />
        <CartPriceContainer cartData={cartData} />
      </Content>
    </div>
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
