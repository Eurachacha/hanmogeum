import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import OrderInfoContainer from "@/containers/orderCheckout/OrderInfoContainer";
import OrderPriceContainer from "@/containers/orderCheckout/OrderPriceContainer";
import { CartItem } from "@/types/cart";
import cartApi from "@/apis/services/cart";
import Button from "@/components/common/Button";
import { cartCheckedItemState, cartState } from "@/recoil/atoms/cartState";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import Modal from "@/components/common/Modal";
import { RequestCreateOrder, ShippingInfoType } from "@/types/orders";
import ordersApi from "@/apis/services/orders";

const OrderCheckoutPage = () => {
  const user = useRecoilValue(loggedInUserState);
  const checkedItems = useRecoilValue(cartCheckedItemState);
  const setCartStorage = useSetRecoilState(cartState);
  const [cartData, setCartData] = useState<CartItem[]>();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfoType>();
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isOrderErrorModalOpen, setIsOrderErrorModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchAllCartItems = async () => {
    try {
      const response = await cartApi.getAllItems();
      const { item: items } = response.data;
      setCartData(items.filter((item) => checkedItems.includes(item.product_id)));
      const isAllInStock = items.every((item) => item.quantity <= item.product.quantity - item.product.buyQuantity);
      if (!isAllInStock) setIsStockModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const createOrder = async (data: RequestCreateOrder) => {
    try {
      const response = location.state
        ? await ordersApi.createOrder(data)
        : await ordersApi.createOrder({ ...data, type: "cart" });
      if (!location.state) {
        const getAllCartResponse = await cartApi.getAllItems();
        const { item } = getAllCartResponse.data;
        setCartStorage(
          item.map((e) => {
            return {
              quantity: e.quantity,
              product: {
                _id: e.product._id,
                name: e.product.name,
                image: e.product.image,
                price: e.product.price,
              },
              stock: e.product.quantity - e.product.buyQuantity,
            };
          }),
        );
      }
      if (response.data.ok) navigate("/orders/complete");
      else throw new Error();
    } catch (error) {
      if ((error as AxiosError).response?.status === 422) {
        setIsOrderErrorModalOpen(true);
      }
      console.error(error);
    }
  };

  const handleStockModalClose = () => {
    navigate(-1);
    setIsStockModalOpen(false);
  };

  const handleShippingModalClose = () => {
    setIsShippingModalOpen(false);
  };

  const handleOrderErrorModalClose = () => {
    navigate(-1);
    setIsOrderErrorModalOpen(false);
  };

  const handlePostOrder = () => {
    if (!shippingInfo?.name || !shippingInfo?.phone || !shippingInfo?.address.value) {
      setIsShippingModalOpen(true);
      return;
    }
    const productsData = cartData!.map((item) => {
      return { _id: item.product._id, quantity: item.quantity };
    });
    const data = {
      products: location.state ? [{ _id: location.state._id, quantity: location.state.quantityInput }] : productsData,
      shippingInfo: shippingInfo,
    };
    createOrder(data);
  };

  const handleErrorModalClose = () => {
    navigate(-1);
    setIsErrorModalOpen(false);
  };

  useEffect(() => {
    if (!cartData || cartData.length <= 0) {
      setIsErrorModalOpen(true);
    }
    if (user) fetchAllCartItems();
  }, []);

  if (user && cartData && cartData.length > 0) {
    return (
      <OrderCheckoutPageLayer>
        <Modal isOpen={isOrderErrorModalOpen} message="주문에 실패했습니다.\n장바구니페이지로 돌아갑니다.">
          <ButtonWrapper onClick={handleOrderErrorModalClose}>
            <Button value="확인" size="sm" variant="sub" />
          </ButtonWrapper>
        </Modal>
        <Modal isOpen={isStockModalOpen} message="재고가 부족한 상품이 있습니다.">
          <ButtonWrapper onClick={handleStockModalClose}>
            <Button value="확인" size="sm" variant="sub" />
          </ButtonWrapper>
        </Modal>
        <Modal isOpen={isShippingModalOpen} message="배송정보를 올바르게 입력해주세요.">
          <ButtonWrapper onClick={handleShippingModalClose}>
            <Button value="확인" size="sm" variant="sub" />
          </ButtonWrapper>
        </Modal>
        <PageLeft>
          <OrderInfoContainer cartData={cartData} setShippingInfo={setShippingInfo} />
        </PageLeft>
        <PageRight>
          <OrderPriceContainer cartData={cartData} />
          <OrderButtonWrapper onClick={handlePostOrder}>
            <Button value="결제하기" size="lg" variant="point" />
          </OrderButtonWrapper>
        </PageRight>
      </OrderCheckoutPageLayer>
    );
  }
  return (
    <Modal isOpen={isErrorModalOpen} message="잘못된 접근입니다.">
      <ButtonWrapper onClick={handleErrorModalClose}>
        <Button value="확인" size="sm" variant="point"></Button>
      </ButtonWrapper>
    </Modal>
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

const OrderButtonWrapper = styled.div``;
