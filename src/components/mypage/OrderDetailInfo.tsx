import styled from "styled-components";
import { useRecoilValue } from "recoil";
import React, { useState } from "react";
import ContainerHeader from "./ContainerHeader.";
import { MyOrderItem } from "@/types/myPage";
import getPriceFormat from "@/utils/getPriceFormat";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import autoHyphenPhoneNumber from "../../utils/autoHyphenPhoneNumber";
import { flattenCodeState } from "@/recoil/atoms/codeState";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import myPageApi from "@/apis/services/mypage";
import ORDER_STATE from "@/constants/code";

interface OrderDetailInfoProps {
  orderData?: MyOrderItem;
  shippingState?: string;
}

const OrderDetailInfo = ({ orderData, shippingState }: OrderDetailInfoProps) => {
  const codeData = useRecoilValue(flattenCodeState);
  const currentUserInfo = useRecoilValue(loggedInUserState);
  const [isOpenModalData, setIsOpenModalData] = useState({ isOpen: false, message: "" });
  const patchShippingState = async () => {
    await myPageApi.patchMyPageOrderShippingCancel(orderData?._id || "");
  };
  const shippingCancel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    patchShippingState();
    setIsOpenModalData({ isOpen: true, message: "주문 취소되었습니다." });
  };

  const modalHandleButton = () => {
    setIsOpenModalData((prevState) => {
      return { ...prevState, isOpen: false };
    });
  };

  const orderInfoList = [
    { title: "주문번호", value: currentUserInfo?._id || "" },
    { title: "보내는 분", value: currentUserInfo?.name || "" },
    { title: "이메일", value: currentUserInfo?.email || "" },
    { title: "휴대폰 번호", value: autoHyphenPhoneNumber(currentUserInfo?.phone || "") },
    { title: "결제일시", value: orderData?.createdAt || "" },
  ];

  const shippingInfoList = [
    {
      title: "배송상태",
      value: codeData[orderData?.state || ""]?.value,
      showButton: shippingState === ORDER_STATE.SHIPPING_PREPARING.CODE,
      buttonHandle: shippingCancel,
    },
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
      <ModalWrapper onSubmit={modalHandleButton}>
        <Modal isOpen={isOpenModalData.isOpen} message={isOpenModalData.message}>
          <Button value="확인" size="sm" variant="sub"></Button>
        </Modal>
      </ModalWrapper>
      <UserInfoWrapper>
        <div>
          <ContainerHeader title="주문 정보" variant="sub" />
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
          <ContainerHeader title="배송 정보" variant="sub" />
          <InfoListWrapper>
            {shippingInfoList.map((infoData, idx) => {
              const infoWrapperKey = `OrderDetailInfo_InfoWrapper_${idx}`;
              return (
                <InfoDataWrapper key={`${infoWrapperKey}Data`} onSubmit={infoData.buttonHandle}>
                  <InfoDataStyle key={infoWrapperKey}>
                    <InfoTitleStyle>{infoData.title}</InfoTitleStyle>
                    <InfoValueStyle>{infoData.value}</InfoValueStyle>
                  </InfoDataStyle>
                  {infoData?.showButton && <Button value="주문 취소" size="sm" variant="sub"></Button>}
                </InfoDataWrapper>
              );
            })}
          </InfoListWrapper>
        </div>
      </UserInfoWrapper>
      <PaymentInfoWrapper>
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
      </PaymentInfoWrapper>
      <TotalCostWrapper>
        <span>총 결제 금액</span>
        <span>{getPriceFormat({ price: orderData?.cost?.total })}</span>
      </TotalCostWrapper>
    </OrderDetailInfoLayer>
  );
};

export default OrderDetailInfo;

const ModalWrapper = styled.form``;

const UserInfoWrapper = styled.div`
  display: flex;
  gap: 2rem;
  & > div {
    width: 100%;
    min-width: 30rem;
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
`;

const InfoDataWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: start;
  button {
    width: 8rem;
    padding: 0.3rem;
    margin: 0rem;
  }
`;
const InfoDataStyle = styled.div`
  display: flex;
  height: 2.6rem;
`;
const InfoTitleStyle = styled.span`
  font-weight: var(--weight-bold);
  min-width: 14rem;
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

const PaymentInfoWrapper = styled.div`
  span:last-child {
    margin-left: auto;
  }
`;
