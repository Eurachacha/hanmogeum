import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import OrderItem from "@/components/mypage/OrderItem";
import OrderItemContentsText from "@/components/mypage/OrderItemContentsText";
import Button from "@/components/common/Button";
import myPageApi from "@/apis/services/mypage";
import { MyOrderItem } from "../../types/myPage";
import GetDate from "@/utils/getDate";
import truncateString from "@/utils/truncateString";

import { flattenCodeState } from "@/recoil/atoms/codeState";
import { FlattenData } from "@/types/code";
import getPriceFormat from "@/utils/getPriceFormat";
import ContainerHeader from "@/components/mypage/ContainerHeader.";
import Dropdown from "@/components/common/Dropdown";
import GetDateNow from "../../utils/getDateNow";

const MyOrderListContainer = () => {
  const maxTitleLength = 15;
  const [orderList, setOrderList] = useState<MyOrderItem[]>([]);
  const [dropDownIdx, setDropDownIdx] = useState(0);

  const dropDownList = ["3개월", "6개월", "1년", "3년"];
  const dropDownData = [
    { name: "3개월", type: "month", typeValue: -3 },
    { name: "6개월", type: "month", typeValue: -6 },
    { name: "1년", type: "year", typeValue: -1 },
    { name: "3년", type: "year", typeValue: -3 },
  ];
  const navigator = useNavigate();

  const flattenCodeDataState: FlattenData = useRecoilValue(flattenCodeState);

  const getFilterStartAndEndDate = () => {
    const getDateNow = new GetDateNow();
    const endDate = getDateNow.getDateYearMonthDay() || "";
    let startDate = "";
    if (dropDownData[dropDownIdx].type === "month") {
      startDate = getDateNow.getDateMonth(dropDownData[dropDownIdx].typeValue);
    } else if (dropDownData[dropDownIdx].type === "year") {
      startDate = getDateNow.getDateYear(dropDownData[dropDownIdx].typeValue);
    }

    return { startDate, endDate };
  };

  const requestGetMyOrderList = async () => {
    const { startDate, endDate } = getFilterStartAndEndDate();
    try {
      const { data } = await myPageApi.getMyPageOrderList({ createdAt: { startDate, endDate } });
      if (data.ok === 1) {
        const orderItemList = data.item;
        setOrderList(() => [...orderItemList]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const orderItemToThumbnailData = (orderItem: MyOrderItem) => {
    const getData = new GetDate(orderItem.createdAt);
    let title = orderItem?.products[0]?.name;
    if (title?.length > maxTitleLength) {
      if (orderItem.products.length === 1) {
        title = truncateString({ fullString: orderItem.products[0].name, maxLength: maxTitleLength });
      } else {
        title = `${truncateString({ fullString: orderItem.products[0].name, maxLength: maxTitleLength })} 외 ${
          orderItem.products.length - 1
        } 개`;
      }
    }

    const ShippingCode = orderItem.state || orderItem?.products[0]?.state;
    const shippingState = flattenCodeDataState[ShippingCode]?.value;

    return {
      id: orderItem._id,
      title: title,
      date: getData.getDateYearMonthDay(),
      totalPrice: getPriceFormat({ price: orderItem.cost.total }),
      imgURL: `${import.meta.env.VITE_API_BASE_URL}/${orderItem?.products[0].image.url}`,

      shippingState: shippingState,
    };
  };

  const detailButtonClickHandle = (orderId: string) => {
    navigator(`/mypage/orders/${orderId}`);
  };

  useEffect(() => {
    requestGetMyOrderList();
  }, [dropDownIdx]);

  return (
    <MyOrderListContainerLayer>
      <OrderItemListWrapper>
        <ContainerHeader title="주문 내역">
          <PeriodContentsWrapper>
            <DropDownWrapper>
              <Dropdown
                onItemSelected={(index) => {
                  setDropDownIdx(index);
                }}
                name="period"
                list={dropDownList}
              />
            </DropDownWrapper>
          </PeriodContentsWrapper>
        </ContainerHeader>

        <OrderListWrapper>
          {orderList.map((order, idx) => {
            const mapKey = `${idx}_${order._id}_${order.createdAt}`;
            const orderThumbnail = orderItemToThumbnailData(order);
            return (
              <OrderWrapper key={mapKey} onClick={() => detailButtonClickHandle(`${order._id}`)}>
                <OrderInfoWrapper>
                  <span>주문 번호 {orderThumbnail.id}</span>
                  <span>{orderThumbnail.date}</span>
                </OrderInfoWrapper>
                <OrderItem productImageURL={orderThumbnail.imgURL}>
                  <OrderItemContentsText
                    textList={[`${orderThumbnail.title}`, `${orderThumbnail.totalPrice}`]}
                    subTextList={[`${orderThumbnail.date} 주문`]}
                  />
                  <ItemRightContentsStyle>
                    <span>{`${orderThumbnail.shippingState}`}</span>
                    <DetailButtonWrapper>
                      <Button value="주문 상세보기" size="md" variant="point" />
                    </DetailButtonWrapper>
                  </ItemRightContentsStyle>
                </OrderItem>
              </OrderWrapper>
            );
          })}
        </OrderListWrapper>
      </OrderItemListWrapper>
    </MyOrderListContainerLayer>
  );
};
export default MyOrderListContainer;
const PeriodContentsWrapper = styled.div`
  margin-left: auto;
`;

const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
const OrderWrapper = styled.div`
  cursor: pointer;
`;

const OrderItemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const MyOrderListContainerLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

const OrderInfoWrapper = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.6rem;
  font-weight: var(--weight-bold);
  margin-bottom: 1.2rem;
  :first-child {
    padding-right: 1rem;
    border-right: 2px solid var(--color-gray-500);
  }
`;

const ItemRightContentsStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 16rem;
  gap: 1rem;
  & > span {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const DetailButtonWrapper = styled.div`
  height: 5rem;
  width: 16rem;
`;

const DropDownWrapper = styled.div`
  width: 14rem;
  height: 4rem;
  font-size: 1.4rem;
  & > div {
    height: 4rem;
  }
`;
