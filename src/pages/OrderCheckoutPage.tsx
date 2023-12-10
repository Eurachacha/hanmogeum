import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import OrderInfo from "@/containers/orderCheckout/OrderInfo";
import OrderPriceContainer from "@/containers/orderCheckout/OrderPriceContainer";
import { CartItem } from "@/types/cart";
import cartApi from "@/apis/services/cart";
import Button from "@/components/common/Button";
import { cartCheckedItemState } from "@/recoil/atoms/cartState";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import Modal from "@/components/common/Modal";

const OrderCheckoutPage = () => {
  const user = useRecoilValue(loggedInUserState);
  const checkedItems = useRecoilValue(cartCheckedItemState);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchAllCartItems = async () => {
    try {
      const response = await cartApi.getAllItems();
      const { item: items } = response.data;
      setCartData(items.filter((item) => checkedItems.includes(item.product_id)));
      const isAllInStock = items.every((item) => item.quantity <= item.product.quantity - item.product.buyQuantity);
      if (!isAllInStock) setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    navigate(-1);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) fetchAllCartItems();
  }, []);

  return (
    <OrderCheckoutPageLayer>
      <Modal isOpen={isModalOpen} message="재고가 부족한 상품이 있습니다.">
        <ButtonWrapper onClick={handleModalClose}>
          <Button value="확인" size="sm" variant="sub" />
        </ButtonWrapper>
      </Modal>
      <PageLeft>
        <OrderInfo cartData={cartData} />
      </PageLeft>
      <PageRight>
        <OrderPriceContainer cartData={cartData} />
        <div>
          <Button value="결제하기" size="lg" variant="point" />
        </div>
      </PageRight>
    </OrderCheckoutPageLayer>
  );
};

export default OrderCheckoutPage;

const OrderCheckoutPageLayer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ButtonWrapper = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
`;

const PageLeft = styled.div`
  flex: 7;
  max-width: 768px;
`;

const PageRight = styled.div`
  flex: 3;
  margin: 5rem 0;
  margin-left: 1rem;
  min-width: 300px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;
