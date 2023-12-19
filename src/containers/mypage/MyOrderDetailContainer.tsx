import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import { MyOrderItem, Product } from "@/types/myPage";
import myPageApi from "@/apis/services/mypage";
import Button from "@/components/common/Button";
import OrderDetailInfo from "@/components/mypage/OrderDetailInfo";
import getPriceFormat from "@/utils/getPriceFormat";
import ContainerHeader from "@/components/mypage/ContainerHeader.";
import cartApi from "@/apis/services/cart";
import Modal from "@/components/common/Modal";
import ORDER_STATE from "@/constants/code";

interface ProductImgWrapperProps {
  $orderCancelState: boolean;
}

const MyOrderDetailContainer = () => {
  const [orderDetail, setOrderDetail] = useState<MyOrderItem>();
  const [openModal, setOenModal] = useState({ isOpen: false, message: "" });
  const [shippingState, setShippingState] = useState("");
  const [orderCancelState, setOrderCancelState] = useState(false);

  const navigator = useNavigate();
  const { id } = useParams();

  const requestGetMyOrderList = async () => {
    try {
      const { data } = await myPageApi.getMyPageOrderDetail(id || "");
      if (data.ok === 1) {
        setOrderDetail(data.item);
      }
    } catch (error) {
      setOenModal({ isOpen: true, message: "존재하지 않는 주문번호입니다." });
      console.error(error);
    }
  };

  // const reviewButtonHandleClick = () => {
  //   // TODO: 리뷰 작성 페이지 구현
  //   navigator(`/mypage/reviews`);
  // };

  const cartButtonHandleClick = async ({ _id, quantity }: Product) => {
    try {
      const addItem = { product_id: _id, quantity };
      await cartApi.addItem(addItem);
    } catch (error) {
      console.error(error);
    }
  };

  const errorPageHandleClick = () => {
    setOenModal(() => {
      return { isOpen: false, message: "" };
    });
    navigator("/mypage/orders");
  };

  useEffect(() => {
    setShippingState(orderDetail?.state || "");

    // 주문 취소
    if (shippingState === ORDER_STATE.SHIPPING_CANCEL.CODE) {
      setOrderCancelState(true);
    } else {
      setOrderCancelState(false);
    }
  }, [orderDetail]);

  useEffect(() => {
    requestGetMyOrderList();
  }, []);
  return (
    <MyOrderDetailContainerLayer>
      <ModalWrapper>
        <Modal isOpen={openModal.isOpen} message={openModal.message}>
          <ModalButtonWrapper onClick={errorPageHandleClick}>
            <Button value="확인" size="md" variant="sub" />
          </ModalButtonWrapper>
        </Modal>
      </ModalWrapper>
      <div>
        <ContainerHeader title={`주문 번호 : ${id}`} />
        {orderDetail?.products.map((product, idx) => {
          const orderItemKey = `MypageLayoutContainer_${product._id}${idx}`;
          return (
            <OrderDetailItemWrapper key={orderItemKey}>
              <ProductImgWrapper $orderCancelState={orderCancelState}>
                <img src={`${import.meta.env.VITE_API_BASE_URL}/${product.image.url}`} alt={product.name} />
              </ProductImgWrapper>
              <ProductInfoWrapper>
                <ProductName>{product.name}</ProductName>
                <ProductInfoDetailWrapper>
                  <ProductPrice>{`${getPriceFormat({ price: product?.price })}`}</ProductPrice>
                  <ProductInfoSeparator>|</ProductInfoSeparator>
                  <ProductQuantity>{product.quantity}개</ProductQuantity>
                </ProductInfoDetailWrapper>
              </ProductInfoWrapper>

              <ButtonsWrapper>
                {/* 
                // 주문 취소 버튼
                <ReviewButtonStyle onClick={reviewButtonHandleClick}>
                  <Button disabled={orderCancelState} value="리뷰 작성" size="sm" variant="point" />
                </ReviewButtonStyle> */}
                <CartButtonStyle onClick={() => cartButtonHandleClick(product)}>
                  <Button value="장바구니 담기" size="sm" variant="point" />
                </CartButtonStyle>
              </ButtonsWrapper>
            </OrderDetailItemWrapper>
          );
        })}
      </div>
      <OrderDetailInfo shippingState={shippingState} orderData={orderDetail} />
    </MyOrderDetailContainerLayer>
  );
};

export default MyOrderDetailContainer;

const MyOrderDetailContainerLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  overflow: hidden;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 10rem;
`;

// 상품 스타일
const OrderDetailItemWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 30rem;
  gap: 2rem;
  border-bottom: 1px solid var(--color-gray-100);
  padding: 1.6rem;
`;

const ProductImgWrapper = styled.div<ProductImgWrapperProps>`
  border-radius: 5px;
  opacity: ${(props) => (props.$orderCancelState ? "0.6" : "1")};
  img {
    width: 9rem;
    height: 9rem;
  }
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 14rem;
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

const ModalWrapper = styled.div`
  font-weight: var(--weight-bold);
`;
const ModalButtonWrapper = styled.div`
  width: 100%;
`;
