import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CartItemListContainer from "@/containers/cart/CartItemListContainer";
import CartPriceContainer from "@/containers/cart/CartPriceContainer";
import { CartItem } from "@/types/cart";
import cartApi from "@/apis/services/cart";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import { cartCheckedItemState, cartState } from "@/recoil/atoms/cartState";

const CartPage = () => {
  const user = useRecoilValue(loggedInUserState);
  const cartStorage = useRecoilValue(cartState);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const setCheckedItems = useSetRecoilState(cartCheckedItemState);

  const fetchCartItems = async () => {
    try {
      const response = await cartApi.getAllItems();
      const { item: items } = response.data;
      setCheckedItems(items.map((item) => item.product_id));
      setCartData(items);
    } catch (error) {
      console.error(error);
    }
  };

  // 초기 렌더링 - 카트 데이터 GET 요청 + 체크박스 전체 선택으로 리셋
  useEffect(() => {
    if (user) fetchCartItems();
    else setCheckedItems(cartStorage.map((item) => item.product._id));
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
