import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { MyOrderItem, Product } from "@/types/myPage";
import myPageApi from "@/apis/services/mypage";
import OrderItem from "@/components/mypage/OrderItem";
import OrderItemContentsText from "@/components/mypage/OrderItemContentsText";
import Button from "@/components/common/Button";
import OrderDetailInfo from "@/components/mypage/OrderDetailInfo";
import getPriceFormat from "@/utils/getPriceFormat";
import ContainerHeader from "@/components/mypage/ContainerHeader.";
// import OrderDetailItem from "@/components/mypage/OrderDetailItem";
import cartApi from "@/apis/services/cart";

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

  const cartButtonHandleClick = async ({ _id, quantity }: Product) => {
    try {
      const addItem = { product_id: _id, quantity };
      await cartApi.addItem(addItem);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestGetMyOrderList();
  }, []);
  return (
    <MyOrderDetailContainerLayer>
      <div>
        <ContainerHeader title={`주문 번호 : ${orderDetail?._id}`} />
        {orderDetail?.products.map((product, idx) => {
          const orderItemKey = `MypageLayoutContainer_${product._id}${idx}`;
          return (
            <OrderDetailItemWrapper key={orderItemKey}>
              <ProductImgWrapper>
                <img src={product.image} alt={product.name} />
              </ProductImgWrapper>
              <ProductInfoWrapper>
                <ProductName>{product.name}</ProductName>
                <ProductInfoDetailWrapper>
                  <ProductPrice>{`${getPriceFormat({ price: product?.price })}`}</ProductPrice>
                  <ProductInfoSeparator>|</ProductInfoSeparator>
                  <ProductQuantity>{product.quantity}개</ProductQuantity>
                </ProductInfoDetailWrapper>
              </ProductInfoWrapper>
              <ButttonsWrapper>
                <ReviewButtonStyle onClick={reviewButtonHandleClick}>
                  <Button value="리뷰 작성" size="sm" variant="point" />
                </ReviewButtonStyle>
                <CartButtonStyle onClick={() => cartButtonHandleClick(product)}>
                  <Button value="장바구니 담기" size="sm" variant="sub" />
                </CartButtonStyle>
              </ButttonsWrapper>
            </OrderDetailItemWrapper>
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
const ButttonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 10rem;
`;

// 상품 스타일
const OrderDetailItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid var(--color-gray-100);
  padding: 1.6rem;
`;

const ProductImgWrapper = styled.div`
  border-radius: 5px;
  overflow: hidden;
  img {
    width: 9rem;
  }
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-right: auto;
`;

const ProductInfoDetailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProductInfoSeparator = styled.span`
  font-size: 2rem;
  color: var(--color-gray-100);
`;
const ProductName = styled.span`
  font-weight: var(--weight-bold);
`;
const ProductPrice = styled.span`
  font-weight: var(--weight-extrabold);
`;
const ProductQuantity = styled.span`
  font-weight: var(----weight-light);
`;

const ReviewButtonStyle = styled.div``;
const CartButtonStyle = styled.div``;
