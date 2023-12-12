import { styled } from "styled-components";
import OrderListContainer from "./OrderListContainer";
import UserInfoContainer from "@/containers/orderCheckout/UserInfoContainer";
import ShippingInfoContainer from "./ShippingInfoContainer";
import { CartItem } from "@/types/cart";
import { ShippingInfoType } from "@/types/orders";

interface OrderInfoProps {
  cartData: CartItem[] | undefined;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfoType | undefined>>;
}

const OrderInfo = ({ cartData, setShippingInfo }: OrderInfoProps) => {
  return (
    <>
      <Section>
        <SectionTitle>주문 상품</SectionTitle>
        {cartData ? <OrderListContainer cartData={cartData} /> : <p>상품이 없습니다.</p>}
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

export default OrderInfo;

const Section = styled.section`
  margin: 40px 0;
`;

const SectionTitle = styled.p`
  font-size: 1.8rem;
  font-weight: var(--weight-bold);
  padding: 12px 4px;
  border-bottom: 1px solid var(--color-gray-300);
`;
