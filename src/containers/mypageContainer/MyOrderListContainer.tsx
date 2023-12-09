import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import MypageLayoutContainer from "./MypageLayoutContainer";
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

const MyOrderListContainer = () => {
  const maxTitleLength = 15;
  const [orderList, setOrderList] = useState<MyOrderItem[]>([]);
  const navigator = useNavigate();

  const flattenCodeDataState: FlattenData = useRecoilValue(flattenCodeState);

  const requestGetMyOrderList = async () => {
    try {
      const { data } = await myPageApi.getMyPageOrderList();
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
    let title = orderItem.products[0].name;
    if (title.length > maxTitleLength) {
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
      imgURL: orderItem.products[0].image,
      shippingState: shippingState,
    };
  };

  const detailButtonClickHandle = (orderId: string) => {
    navigator(`/mypage/orders/${orderId}`);
  };

  useEffect(() => {
    requestGetMyOrderList();
  }, []);

  return (
    <MyOrderListContainerLayer>
      <MypageLayoutContainer ContentsTitle="주문 내역">
        <OrderItemListWrapper>
          {orderList.map((order, idx) => {
            const mapKey = `${idx}_${order._id}_${order.createdAt}`;
            const orderThumbnail = orderItemToThumbnailData(order);
            return (
              <OrderWrapper key={mapKey} onClick={() => detailButtonClickHandle(`${order._id}`)}>
                <OrderInfoWrapper>
                  <span>{orderThumbnail.id}</span>
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
        </OrderItemListWrapper>
      </MypageLayoutContainer>
    </MyOrderListContainerLayer>
  );
};
export default MyOrderListContainer;

const OrderWrapper = styled.div`
  cursor: pointer;
`;

const OrderItemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
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
  margin-bottom: 1.6rem;
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
