import { styled } from "styled-components";
import { useEffect, useState } from "react";
import OrderInfo from "@/containers/orderCheckout/OrderInfo";
import OrderPriceContainer from "@/containers/orderCheckout/OrderPriceContainer";
import { CartItem } from "@/types/cart";
import cartApi from "@/apis/services/cart";
import Button from "@/components/common/Button";

const OrderCheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>();

  const fetchAllCartItems = async () => {
    try {
      const response = await cartApi.getAllItems();
      const { item } = response.data;
      setCartItems(item);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllCartItems();
  }, []);

  return (
    <OrderCheckoutPageLayer>
      <PageLeft>
        <OrderInfo cartItems={cartItems} />
      </PageLeft>
      <PageRight>
        <OrderPriceContainer cartItems={cartItems} />
        <div>
          <Button value="결제하기" size="lg" variant="point" />
        </div>
      </PageRight>
    </OrderCheckoutPageLayer>
  );
};

export default OrderCheckoutPage;

const OrderCheckoutPageLayer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PageLeft = styled.div`
  flex: 7;
  max-width: 768px;
`;

const PageRight = styled.div`
  flex: 3;
  margin: 5rem 0;
  margin-left: 1rem;
  min-width: 300px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;
