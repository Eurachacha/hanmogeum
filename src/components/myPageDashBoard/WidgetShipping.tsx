import { useEffect, useState } from "react";
import styled from "styled-components";
import myPageApi from "@/apis/services/mypage";
import ORDER_STATE from "@/constants/code";

type OrderStatus = {
  value: number;
  name: string;
};

const WidgetShipping = () => {
  // TODO: 리액트 쿼리로 수정
  const [shippingInfo, setShippingInfo] = useState<Record<string, OrderStatus>>();
  const getShippingData = async () => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // itemObject init
      const itemObject: Record<string, OrderStatus> = {};

      Object.keys(ORDER_STATE).forEach((state) => {
        const key = state as keyof typeof ORDER_STATE;
        itemObject[ORDER_STATE[key]?.CODE] = { value: 0, name: ORDER_STATE[key].NAME };
      });

      // get Data
      const { data } = await myPageApi.getMyPageShippingState();
      data.item.forEach((orderState) => {
        itemObject[orderState?.state].value += 1;
      });

      setShippingInfo(itemObject);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getShippingData();
  }, []);

  return (
    <DashBoardShippingLayout>
      <TitleWrapper>
        <span>주문 / 배송 조회</span>
      </TitleWrapper>
      <ShippingInfoWrapper>
        <ShippingDataStyle>
          <div>{(shippingInfo && shippingInfo[ORDER_STATE.SHIPPING_PREPARING.CODE].value) || 0}</div>
          <div>{ORDER_STATE.SHIPPING_PREPARING.NAME}</div>
        </ShippingDataStyle>
        <Separator>{">"}</Separator>

        <ShippingDataStyle>
          <div>{(shippingInfo && shippingInfo[ORDER_STATE.SHIPPING_PROGRESS.CODE].value) || 0}</div>
          <div>{ORDER_STATE.SHIPPING_PROGRESS.NAME}</div>
        </ShippingDataStyle>
        <Separator>{">"}</Separator>

        <ShippingDataStyle>
          <div>{(shippingInfo && shippingInfo[ORDER_STATE.SHIPPING_FINISH.CODE].value) || 0}</div>
          <div>{ORDER_STATE.SHIPPING_FINISH.NAME}</div>
        </ShippingDataStyle>
      </ShippingInfoWrapper>
    </DashBoardShippingLayout>
  );
};

export default WidgetShipping;

const DashBoardShippingLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TitleWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: var(--weight-bold);
`;
const ShippingInfoWrapper = styled.div`
  display: Flex;
  align-items: center;
  justify-content: space-around;
`;

const ShippingDataStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  min-width: 6.5rem;
  flex-wrap: wrap;
  font-weight: var(--weight-semibold);
  gap: 1rem;
  & > div:first-child {
    font-size: 4rem;
    font-weight: 700;
    font-weight: var(--weight-bold);
    color: var(--color-gray-300);
  }
`;

const Separator = styled.div`
  font-size: 2rem;
  color: var(--color-gray-200);
  font-family: sans-serif;
  font-weight: var(--weight-heavy);
`;
