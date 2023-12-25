import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import OrderItem from "@/components/orderCheckout/OrderItem";
import { CartItem } from "@/types/cart";
import { OrderFromDetailPage } from "@/types/orders";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";

interface OrderListContainerProps {
  cartData: CartItem[];
  orderData: OrderFromDetailPage;
}

const OrderListContainer = ({ cartData, orderData }: OrderListContainerProps) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleErrorModalClose = () => {
    navigate("/", { replace: true });
    setIsErrorModalOpen(false);
  };

  useEffect(() => {
    if (!location.state && cartData.length < 1) {
      setIsErrorModalOpen(true);
    }
  }, []);

  if (orderData) {
    return (
      <OrderItem
        id={orderData._id}
        imgUrl={`${import.meta.env.VITE_API_BASE_URL}${orderData.mainImages[0].url}`}
        name={orderData.name}
        quantity={orderData.quantityInput}
        priceSum={orderData.price * orderData.quantityInput}
      />
    );
  }
  if (cartData.length > 0)
    return (
      <>
        {cartData.map((item, idx) => {
          const key = idx.toString();
          return (
            <OrderItem
              key={key}
              id={item.product._id}
              imgUrl={`${import.meta.env.VITE_API_BASE_URL}${item.product.image.url}`}
              name={item.product.name}
              quantity={item.quantity}
              priceSum={item.product.price * item.quantity}
            />
          );
        })}
      </>
    );

  return (
    <Modal isOpen={isErrorModalOpen} message="잘못된 접근입니다.">
      <ButtonWrapper onClick={handleErrorModalClose}>
        <Button value="확인" size="sm" variant="point"></Button>
      </ButtonWrapper>
    </Modal>
  );
};

export default OrderListContainer;

const ButtonWrapper = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
`;
