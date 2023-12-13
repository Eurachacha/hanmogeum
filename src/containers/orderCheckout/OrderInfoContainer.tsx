import { styled } from "styled-components";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderListContainer from "./OrderListContainer";
import UserInfoContainer from "@/containers/orderCheckout/UserInfoContainer";
import ShippingInfoContainer from "./ShippingInfoContainer";
import { CartItem } from "@/types/cart";
import { ShippingInfoType } from "@/types/orders";

interface OrderInfoContainerProps {
  cartData: CartItem[] | undefined;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfoType | undefined>>;
}

const OrderInfoContainer = ({ cartData, setShippingInfo }: OrderInfoContainerProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) return;
    if (!cartData || cartData.length <= 0) navigate("/", { replace: true });
  }, []);
  return (
    <>
      <Section>
        <SectionTitle>주문 상품</SectionTitle>
        <OrderListContainer cartData={cartData!} orderData={location.state} />
      </Section>
      <Section>
        <SectionTitle>주문자 정보</SectionTitle>
        <UserInfoContainer />
      </Section>
      <Section>
        <SectionTitle>배송 정보</SectionTitle>
        <ShippingInfoContainer setShippingInfo={setShippingInfo} />
      </Section>
    </>
  );
};

export default OrderInfoContainer;

const Section = styled.section`
  margin: 40px 0;
`;

const SectionTitle = styled.p`
  font-size: 1.8rem;
  font-weight: var(--weight-bold);
  padding: 12px 4px;
  border-bottom: 1px solid var(--color-gray-300);
`;
