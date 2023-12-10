import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import Price from "@/components/common/Price";
import Button from "@/components/common/Button";
import { CartItem } from "@/types/cart";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import { cartCheckedItemState, cartState } from "@/recoil/atoms/cartState";
import { FREE_SHIPPING_FEES, SHIPPING_FEES } from "@/constants/order";

interface CartPriceContainerProps {
  cartData: CartItem[];
}

const CartPriceContainer = ({ cartData }: CartPriceContainerProps) => {
  const user = useRecoilValue(loggedInUserState);
  const checkedItems = useRecoilValue(cartCheckedItemState);
  const cartStorage = useRecoilValue(cartState);
  const [checkedPrice, setcheckedPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 시 선택상품금액 세팅
    if (user) {
      const checkedPrices = cartData
        .filter((item) => checkedItems.includes(item.product._id))
        .map((item) => item.product.price * item.quantity);
      const sum = checkedPrices.reduce((a: number, b: number) => a + b, 0);
      setcheckedPrice(sum);
      return;
    }
    // 비로그인 시 선택상품금액 세팅
    const checkedPrices = cartStorage
      .filter((item) => checkedItems.includes(item.product._id))
      .map((item) => item.product.price * item.quantity);
    const sum = checkedPrices.reduce((a: number, b: number) => a + b, 0);
    setcheckedPrice(sum);
  }, [checkedItems, cartData, cartStorage]);

  return (
    <CartPriceContainerLayer>
      <PriceWrapper>
        <Price priceTitle="선택 상품 금액" number={checkedPrice} />
        <Price priceTitle="배송비" number={checkedPrice > 0 && checkedPrice < FREE_SHIPPING_FEES ? SHIPPING_FEES : 0} />
        <div>
          <Price
            priceTitle="총 결제 금액"
            number={checkedPrice > 0 && checkedPrice < FREE_SHIPPING_FEES ? SHIPPING_FEES + checkedPrice : checkedPrice}
          />
        </div>
      </PriceWrapper>
      <ButtonWrapper onClick={() => navigate("/orders/checkout")}>
        <Button value="구매하기" size="lg" variant="point" />
      </ButtonWrapper>
    </CartPriceContainerLayer>
  );
};

export default CartPriceContainer;

const CartPriceContainerLayer = styled.div`
  margin: 5rem 0;
  margin-left: 1rem;
  min-width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PriceWrapper = styled.div`
  background-color: var(--color-gray-50);
  border-radius: 5px;
  padding: 8px 16px;
  margin: 10px 0;
  color: var(--color-gray-300);

  div:last-child {
    border-top: 1px solid var(--color-gray-200);
    color: var(--color-black);
  }
`;

const ButtonWrapper = styled.div``;
