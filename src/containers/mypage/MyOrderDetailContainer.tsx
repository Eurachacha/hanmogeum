import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import { MyOrderItem } from "@/types/myPage";
import myPageApi from "@/apis/services/mypage";
import OrderItem from "@/components/mypage/OrderItem";
import OrderItemContentsText from "@/components/mypage/OrderItemContentsText";
import Button from "@/components/common/Button";
import OrderDetailInfo from "@/components/mypage/OrderDetailInfo";
import getPriceFormat from "@/utils/getPriceFormat";
import ContainerHeader from "@/components/mypage/ContainerHeader.";

const MyOrderDetailContainer = () => {
  const [orderDetail, setOrderDetail] = useState<MyOrderItem>();
  const navigator = useNavigate();
  const { id } = useParams();

  const requestGetMyOrderList = async () => {
    try {
      const { data } = await myPageApi.getMyPageOrderList();
      if (data.ok === 1) {
        const orderItemList = data.item;
        const orderItem = orderItemList.find((item) => `${item._id}` === `${id}`);
        setOrderDetail(orderItem);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reviewButtonHandleClick = () => {
    // TODO: 리뷰 작성 페이지 구현
    navigator(`/mypage/reviews`);
  };

  useEffect(() => {
    requestGetMyOrderList();
  }, []);
  return (
    <MyOrderDetailContainerLayer>
      <ContainerHeader title="주문 상세 페이지" />
      <div>
        {orderDetail?.products.map((product, idx) => {
          const orderItemKey = `MypageLayoutContainer_${product._id}${idx}`;
          return (
            <OrderItem key={orderItemKey} productImageURL={product.image}>
              <OrderItemContentsText
                textList={[product.name, getPriceFormat({ price: product.price })]}
              ></OrderItemContentsText>
              <ReviewButtonWrapper onClick={reviewButtonHandleClick}>
                <Button value="리뷰 작성" size="md" variant="point" />
              </ReviewButtonWrapper>
            </OrderItem>
          );
        })}
      </div>
      <OrderDetailInfo orderData={orderDetail} />
    </MyOrderDetailContainerLayer>
  );
};

export default MyOrderDetailContainer;

const MyOrderDetailContainerLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;
const ReviewButtonWrapper = styled.div`
  height: 5rem;
  width: 16rem;
`;
