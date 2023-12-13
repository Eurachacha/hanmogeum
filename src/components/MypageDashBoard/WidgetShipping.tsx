import { useEffect, useState } from "react";
import styled from "styled-components";
import myPageApi from "@/apis/services/mypage";

const WidgetShipping = () => {
  // TODO: 리액트 쿼리로 수정
  const [shippingInfo, setShippingInfo] = useState([
    {
      name: "배송준비중",
      value: 0,
      code: "OS030",
    },
    { name: "배송중", value: 0, code: "OS035" },
    { name: "배송완료", value: 0, code: "OS040" },
  ]);
  const getShippingData = async () => {
    try {
      const response1 = await myPageApi.getMyPageOrderByShippingCode(shippingInfo[0].code);
      const response2 = await myPageApi.getMyPageOrderByShippingCode(shippingInfo[1].code);
      const response3 = await myPageApi.getMyPageOrderByShippingCode(shippingInfo[2].code);
      const updatedState = { ...shippingInfo };
      updatedState[0].value = response1.data.item.length;
      updatedState[1].value = response2.data.item.length;
      updatedState[2].value = response3.data.item.length;
      setShippingInfo(updatedState);
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
          <div>{shippingInfo[0]?.value}</div>
          <div>{shippingInfo[0]?.name}</div>
        </ShippingDataStyle>
        <Separator>{">"}</Separator>

        <ShippingDataStyle>
          <div>{shippingInfo[1]?.value}</div>
          <div>{shippingInfo[1]?.name}</div>
        </ShippingDataStyle>
        <Separator>{">"}</Separator>

        <ShippingDataStyle>
          <div>{shippingInfo[2]?.value}</div>
          <div>{shippingInfo[2]?.name}</div>
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
  font-size: 1.4rem;
  min-width: 6.5rem;
  flex-wrap: wrap;
  font-weight: var(--weight-bold);
  gap: 1rem;
  & > div:first-child {
    font-size: 4rem;
    font-family: var(--weight-heavy);
    color: var(--color-gray-300);
  }
`;

const Separator = styled.div`
  font-size: 2rem;
  color: var(--color-gray-200);
  font-weight: var(--weight-heavy);
`;
