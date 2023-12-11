import styled from "styled-components";
import { useRecoilValue } from "recoil";
import ContainerHeader from "./ContainerHeader.";
import { MyOrderItem } from "@/types/myPage";
import getPriceFormat from "@/utils/getPriceFormat";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import autoHyphenPhoneNumber from "../../utils/autoHyphenPhoneNumber";

interface OrderDetailInfoProps {
  orderData?: MyOrderItem;
}

const OrderDetailInfo = ({ orderData }: OrderDetailInfoProps) => {
  const currentUserInfo = useRecoilValue(loggedInUserState);
  const infoList = [
    { title: "주문자 정보", value: currentUserInfo?.name },
    { title: "주문자 이메일", value: currentUserInfo?.email },
    { title: "주문자 전화번호", value: autoHyphenPhoneNumber(currentUserInfo?.phone || "") },

    { title: "받는분 배송지", value: orderData?.shippingInfo?.name },
    { title: "받는분 연락처", value: autoHyphenPhoneNumber(orderData?.shippingInfo?.phone || "") },
    {
      title: "받는분 배송지 주소",
      value: `${orderData?.shippingInfo?.address.value} ${orderData?.shippingInfo?.address?.detailValue || ""}`,
    },

    { title: "상품 금액", value: getPriceFormat({ price: orderData?.cost.products }) },
    { title: "배송비", value: getPriceFormat({ price: orderData?.cost.shippingFees }) },
    {
      title: "상품 할인 금액",
      value: `- ${getPriceFormat({ price: orderData?.cost.discount.products })}	`,
    },
    { title: "배송 할인 금액", value: `- ${getPriceFormat({ price: orderData?.cost.discount.shippingFees })}` },
  ];

  return (
    <OrderDetailInfoLayer>
      <ContainerHeader title="주문 정보" />
      <InfoListWrapper>
        {infoList.map((infoData, idx) => {
          const infoWrapperKey = `OrderDetailInfo_InfoWrapper_${idx}`;
          return (
            <InfoDataStyle key={infoWrapperKey}>
              <InfoTitleStyle>{infoData.title}</InfoTitleStyle>
              <InfoValueStyle>{infoData.value}</InfoValueStyle>
            </InfoDataStyle>
          );
        })}
      </InfoListWrapper>
      <TotalCostWrapper>
        <span>총 {getPriceFormat({ price: orderData?.cost?.total })}</span>
      </TotalCostWrapper>
    </OrderDetailInfoLayer>
  );
};

export default OrderDetailInfo;

const OrderDetailInfoLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;
const InfoDataStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InfoTitleStyle = styled.span`
  font-weight: var(--weight-bold);
`;
const InfoValueStyle = styled.span`
  font-weight: var(--weight-regular);
`;
const TotalCostWrapper = styled.div`
  width: 100%;
  border-top: 1px solid var(--color-black);
  display: flex;
  justify-content: end;
  padding-top: 2rem;

  span {
    font-weight: var(--weight-bold);
    font-size: 2.4rem;
  }
`;
