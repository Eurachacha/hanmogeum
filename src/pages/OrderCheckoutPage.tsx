import { styled } from "styled-components";
import InfoContainer from "@/containers/orderCheckout/InfoContainer";
import ShippingInfoContainer from "@/containers/orderCheckout/ShippingInfoContainer";
import OrderListContainer from "@/containers/orderCheckout/OrderListContainer";

const OrderCheckoutPage = () => {
  return (
    <OrderCheckoutPageLayer>
      <OrderInfo>
        <Section>
          <SectionTitle>주문 상품</SectionTitle>
          <OrderListContainer />
        </Section>
        <Section>
          <SectionTitle>주문자 정보</SectionTitle>
          <InfoContainer />
        </Section>
        <Section>
          <SectionTitle>배송 정보</SectionTitle>
          <ShippingInfoContainer />
        </Section>
      </OrderInfo>
      <OrderPriceInfo>금액안내</OrderPriceInfo>
    </OrderCheckoutPageLayer>
  );
};

export default OrderCheckoutPage;

const OrderCheckoutPageLayer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const OrderInfo = styled.div`
  flex: 7;
  max-width: 700px;
`;

const Section = styled.section`
  margin: 40px 0;
`;

const SectionTitle = styled.p`
  font-size: 1.8rem;
  font-weight: var(--weight-bold);
  padding: 12px 4px;
  border-bottom: 1px solid var(--color-gray-300);
`;

const OrderPriceInfo = styled.div`
  flex: 3;
  min-width: 300px;
`;
