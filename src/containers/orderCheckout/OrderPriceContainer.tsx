import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Price from "@/components/common/Price";
import { CartItem } from "@/types/cart";
import { SHIPPING_FEES, FREE_SHIPPING_FEES } from "@/constants/order";

interface OrderPriceContainerProps {
  cartData: CartItem[] | undefined;
}

const OrderPriceContainer = ({ cartData }: OrderPriceContainerProps) => {
  const [priceSum, setPriceSum] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setPriceSum(location.state.price * location.state.quantityInput);
      return;
    }
    if (cartData) {
      setPriceSum(cartData.map((item) => item.quantity * item.product.price).reduce((a, b) => a + b, 0));
    }
  }, [cartData]);

  return (
    <PriceWrapper>
      <Price priceTitle="상품 금액" number={priceSum} />
      <Price priceTitle="배송비" number={priceSum > 0 && priceSum < FREE_SHIPPING_FEES ? SHIPPING_FEES : 0} />
      <div>
        <Price
          priceTitle="총 결제 금액"
          number={priceSum === 0 || priceSum >= FREE_SHIPPING_FEES ? priceSum : priceSum + SHIPPING_FEES}
        />
      </div>
    </PriceWrapper>
  );
};

export default OrderPriceContainer;

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
