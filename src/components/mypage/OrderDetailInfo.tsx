import styled from "styled-components";
import { useRecoilValue } from "recoil";
import ContainerHeader from "./ContainerHeader.";
import { MyOrderItem } from "@/types/myPage";
import getPriceFormat from "@/utils/getPriceFormat";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import autoHyphenPhoneNumber from "../../utils/autoHyphenPhoneNumber";
import { flattenCodeState } from "@/recoil/atoms/codeState";

interface OrderDetailInfoProps {
  orderData?: MyOrderItem;
}

const OrderDetailInfo = ({ orderData }: OrderDetailInfoProps) => {
  const codeData = useRecoilValue(flattenCodeState);
  const currentUserInfo = useRecoilValue(loggedInUserState);
  const orderInfoList = [
    { title: "주문번호", value: currentUserInfo?._id || "" },
    { title: "보내는 분", value: currentUserInfo?.name || "" },
    { title: "이메일", value: currentUserInfo?.email || "" },
    { title: "휴대폰 번호", value: autoHyphenPhoneNumber(currentUserInfo?.phone || "") },
    { title: "결제일시", value: orderData?.createdAt || "" },
  ];

  const shippingInfoList = [
    { title: "배송상태", value: codeData[orderData?.state || ""]?.value },
    { title: "받는분", value: orderData?.shippingInfo?.name || "" },
    { title: "연락처", value: autoHyphenPhoneNumber(orderData?.shippingInfo?.phone || "") },
    {
      title: "배송지",
      value: `${orderData?.shippingInfo?.address?.value || ""} ${orderData?.shippingInfo?.address?.detailValue || ""}`,
    },
  ];

  const paymentInfoList = [
    { title: "상품 금액", value: getPriceFormat({ price: orderData?.cost.products }) || "" },
    { title: "배송비", value: getPriceFormat({ price: orderData?.cost.shippingFees }) || "" },
    { title: "배송 할인 금액", value: `- ${getPriceFormat({ price: orderData?.cost.discount.shippingFees })}` || "" },
  ];

  return (
    <OrderDetailInfoLayer>
      <UserInfoWrapper>
        <div>
          <ContainerHeader title="결제 정보" variant="sub" />
          <InfoListWrapper>
            {orderInfoList.map((infoData, idx) => {
              const infoWrapperKey = `OrderDetailInfo_InfoWrapper_${idx}`;
              return (
                <InfoDataStyle key={infoWrapperKey}>
                  <InfoTitleStyle>{infoData.title}</InfoTitleStyle>
                  <InfoValueStyle>{infoData.value}</InfoValueStyle>
                </InfoDataStyle>
              );
            })}
          </InfoListWrapper>
        </div>
        <div>
          <ContainerHeader title="결제 정보" variant="sub" />
          <InfoListWrapper>
            {shippingInfoList.map((infoData, idx) => {
              const infoWrapperKey = `OrderDetailInfo_InfoWrapper_${idx}`;
              return (
                <InfoDataStyle key={infoWrapperKey}>
                  <InfoTitleStyle>{infoData.title}</InfoTitleStyle>
                  <InfoValueStyle>{infoData.value}</InfoValueStyle>
                </InfoDataStyle>
              );
            })}
          </InfoListWrapper>
        </div>
      </UserInfoWrapper>
      <div>
        <ContainerHeader title="결제 정보" variant="sub" />
        <InfoListWrapper>
          {paymentInfoList.map((infoData, idx) => {
            const infoWrapperKey = `OrderDetailInfo_InfoWrapper_${idx}`;
            return (
              <InfoDataStyle key={infoWrapperKey}>
                <InfoTitleStyle>{infoData.title}</InfoTitleStyle>
                <InfoValueStyle>{infoData.value}</InfoValueStyle>
              </InfoDataStyle>
            );
          })}
        </InfoListWrapper>
      </div>
      <TotalCostWrapper>
        <span>총 결제 금액</span>
        <span>{getPriceFormat({ price: orderData?.cost?.total })}</span>
      </TotalCostWrapper>
    </OrderDetailInfoLayer>
  );
};

export default OrderDetailInfo;

const UserInfoWrapper = styled.div`
  display: flex;
  gap: 2rem;
  & > div {
    width: 100%;
  }
`;

const OrderDetailInfoLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;
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
  padding-top: 2rem;
  justify-content: end;
  align-items: center;
  gap: 2rem;
  span:first-child {
    font-size: 1.6rem;
  }
  span {
    font-weight: var(--weight-bold);
    font-size: 2.4rem;
  }
`;
