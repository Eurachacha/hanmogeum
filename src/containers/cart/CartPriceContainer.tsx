import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Price from "@/components/common/Price";
import Button from "@/components/common/Button";
import { CartItemInfo } from "@/types/cart";

const CartPriceContainer = ({ cartItems }: { cartItems: CartItemInfo[] }) => {
  const [checkedPrice, setcheckedPrice] = useState(0);

  useEffect(() => {
    const checkedPrices = cartItems.filter((item) => item.checked === true).map((item) => item.price * item.quantity);
    const sum = checkedPrices.reduce((a: number, b: number) => a + b, 0);
    setcheckedPrice(sum);
  }, [cartItems]);

  return (
    <CartPriceContainerLayer>
      <PriceWrapper>
        <Price priceTitle="선택 상품 금액" number={checkedPrice} />
        <Price priceTitle="배송비" number={0} />
        <div>
          <Price priceTitle="총 결제 금액" number={checkedPrice + 0} />
        </div>
      </PriceWrapper>
      <div>
        <Button value="구매하기" size="lg" variant="point" />
      </div>
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
