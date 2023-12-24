import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cartState } from "@/recoil/atoms/cartState";
import productsApi from "@/apis/services/products";
import { ProductDetailWithReplies } from "@/types/products";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import cartApi from "@/apis/services/cart";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import CounterButton from "@/components/cart/CounterButton";
import { flattenCodeState } from "@/recoil/atoms/codeState";
import getPriceFormat from "@/utils/getPriceFormat";
import CategoryButton from "@/components/product/productlist/CategoryButton";
import useQuantityCounter from "@/hooks/useQuantityCounter";
import { CartStorageItem } from "@/types/cart";

const ProductDetailPage = () => {
  const [itemData, setItemData] = useState<ProductDetailWithReplies>();
  const user = useRecoilValue(loggedInUserState);
  const [cartStorage, setCartStorage] = useRecoilState(cartState);
  const [isAddCartModalOpen, setIsAddCartModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCheckoutConfirmModalOpen, setIsCheckoutConfirmModalOpen] = useState(false);
  const categoryCodes = useRecoilValue(flattenCodeState);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProductInfo = async (product_id: number) => {
    try {
      const response = await productsApi.getProductById(product_id);
      const { item } = response.data;
      setItemData(item);
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  const addToCartData = async (product_id: number, quantity: number) => {
    try {
      const response = await cartApi.addItem({ product_id: product_id, quantity: quantity });
      const { item: items } = response.data;
      const updatedCartStorage: CartStorageItem[] = items.map((item) => {
        return {
          quantity: item.quantity,
          stock: item.product.quantity - item.product.buyQuantity,
          product: {
            _id: item.product._id,
            name: item.product.name,
            image: item.product.image,
            price: item.product.price,
          },
        };
      });
      setCartStorage(() => updatedCartStorage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id) navigate("/");
    fetchProductInfo(Number(id));
  }, []);

  const handleAddToCart = () => {
    if (user) {
      addToCartData(Number(id), quantityInput);
      setIsAddCartModalOpen(true);
      return;
    }
    const sameItemIndex = cartStorage.findIndex((item) => item.product._id === Number(id));
    const { _id, name, mainImages, price, quantity: itemQuantity, buyQuantity } = itemData!;
    if (quantityInput > itemQuantity - buyQuantity) {
      setIsStockModalOpen(true);
      return;
    }
    if (sameItemIndex !== -1) {
      const newCartStorageItem = {
        quantity: cartStorage[sameItemIndex].quantity + quantityInput,
        product: {
          _id,
          name,
          image: mainImages[0],
          price,
        },
        stock: itemQuantity - buyQuantity,
      };
      const newCartStorageData = [...cartStorage];
      newCartStorageData.splice(sameItemIndex, 1, newCartStorageItem);
      setCartStorage(newCartStorageData);
      setIsAddCartModalOpen(true);
    } else {
      const newCartStorageData = {
        quantity: quantityInput,
        product: {
          _id,
          name,
          image: mainImages[0],
          price,
        },
        stock: itemQuantity - buyQuantity,
      };
      setCartStorage((prev) => [...prev, newCartStorageData]);
      setIsAddCartModalOpen(true);
    }
  };

  const handleCheckoutOrder = () => {
    setIsCheckoutConfirmModalOpen(false);
    navigate("/orders/checkout", { state: { ...itemData, quantityInput } });
  };

  const handleStockUpdate = () => {
    setIsStockModalOpen(false);
  };

  const { handleQuantityInput, quantityInput, setQuantityInputAsStock } = useQuantityCounter(
    1,
    itemData ? itemData.quantity - itemData.buyQuantity : 0,
  );

  useEffect(() => {
    if (itemData && itemData.quantity - itemData.buyQuantity === 0) setQuantityInputAsStock(0);
  }, [itemData]);

  return (
    <ProductDetailPageLayer>
      <Modal isOpen={isStockModalOpen} message="재고가 부족합니다.">
        <ButtonWrapper onClick={handleStockUpdate}>
          <Button value="확인" size="sm" variant="sub" />
        </ButtonWrapper>
      </Modal>
      <Modal isOpen={isAddCartModalOpen} message="상품을 장바구니에 담았습니다.">
        <ButtonWrapper onClick={() => setIsAddCartModalOpen(false)}>
          <Button value="계속 쇼핑하기" size="sm" variant="point" />
        </ButtonWrapper>
        <ButtonWrapper onClick={() => navigate("/cart")}>
          <Button value="장바구니로 가기" size="sm" variant="sub" />
        </ButtonWrapper>
      </Modal>
      <Modal isOpen={isLoginModalOpen} message="로그인 하시겠습니까?">
        <ButtonWrapper onClick={() => setIsLoginModalOpen(false)}>
          <Button value="취소" size="sm" variant="sub" />
        </ButtonWrapper>
        <ButtonWrapper onClick={() => navigate("/login")}>
          <Button value="로그인" size="sm" variant="point" />
        </ButtonWrapper>
      </Modal>
      <Modal
        isOpen={isCheckoutConfirmModalOpen}
        targetString={`${itemData?.name} X ${quantityInput}개`}
        message="구매하시겠습니까?"
      >
        <ButtonWrapper onClick={() => setIsCheckoutConfirmModalOpen(false)}>
          <Button value="취소" size="sm" variant="sub" />
        </ButtonWrapper>
        <ButtonWrapper onClick={handleCheckoutOrder}>
          <Button value="구매하기" size="sm" variant="point" />
        </ButtonWrapper>
      </Modal>
      <ProductInfo>
        <ProductDetailLeft>
          <img src={`${import.meta.env.VITE_API_BASE_URL}${itemData?.mainImages[0].url}`} alt={itemData?.name} />
        </ProductDetailLeft>
        <ProductDetailRight>
          <ProductDetailWrapper>
            <TeaType>{itemData?.extra.teaType[0] ? categoryCodes[itemData?.extra.teaType[0]].value : ""}</TeaType>
            <Title>{itemData?.name}</Title>
            <ItemPrice>{itemData?.price ? getPriceFormat({ price: itemData?.price }) : ""}</ItemPrice>
            <HashTagArea>
              <p>이런 분에게 추천해요!</p>
              <HashTagWrapper>
                {itemData?.extra.hashTag.map((tagCode, idx) => {
                  const keyIndex = idx.toString();
                  return <CategoryButton key={keyIndex} code={tagCode} disabled />;
                })}
              </HashTagWrapper>
            </HashTagArea>
            <QuantityHandler>
              <p>{itemData?.name}</p>
              <CounterWrapper>
                <Counter>
                  <CounterLayer>
                    <CounterButton handleQuantity={() => handleQuantityInput("minus")}>-</CounterButton>
                    <QuantityWrapper
                      type="number"
                      value={quantityInput}
                      max={itemData && itemData.quantity - itemData.buyQuantity}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityInput("", event)}
                    />
                    <CounterButton handleQuantity={() => handleQuantityInput("plus")}>+</CounterButton>
                  </CounterLayer>
                  <p>재고: {itemData && itemData.quantity - itemData.buyQuantity}개</p>
                </Counter>
                <p>{itemData?.price ? getPriceFormat({ price: itemData.price * quantityInput }) : ""}</p>
              </CounterWrapper>
            </QuantityHandler>
            <ButtonArea>
              <MainButtonWrapper onClick={handleAddToCart}>
                <Button value="장바구니" size="lg" variant="sub" disabled={!quantityInput} />
              </MainButtonWrapper>
              <MainButtonWrapper
                onClick={() => (user ? setIsCheckoutConfirmModalOpen(true) : setIsLoginModalOpen(true))}
              >
                <Button value="바로구매" size="lg" variant="point" disabled={!quantityInput} />
              </MainButtonWrapper>
            </ButtonArea>
          </ProductDetailWrapper>
        </ProductDetailRight>
      </ProductInfo>
      <DetailArea dangerouslySetInnerHTML={{ __html: itemData?.content as TrustedHTML }}></DetailArea>
    </ProductDetailPageLayer>
  );
};

export default ProductDetailPage;

const ProductDetailPageLayer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (max-width: 1149px) {
    align-items: center;
  }
`;

const ButtonWrapper = styled.div`
  min-width: 120px;
  padding: 0 4px;
`;

const ProductInfo = styled.div`
  display: flex;

  @media (max-width: 1149px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductDetailLeft = styled.section`
  max-width: 600px;
  text-align: center;
  max-width: 600px;

  & > img {
    width: 600px;
    max-width: 600px;
    border: 1px solid var(--color-gray-100);
    @media (max-width: 1149px) {
      width: 100%;
      min-width: 300px;
    }
  }
`;

const ProductDetailRight = styled.section`
  flex: 1;
  margin-left: 20px;
  @media (max-width: 1149px) {
    margin: 20px 0;
    width: 100%;
  }
  @media (min-width: 1150px) {
    position: fixed;
    padding-left: 20px;
    margin: 0 auto;
    min-width: 28%;
    width: calc(35vw);
    left: calc(50vw - (-100vw * 0.08));
  }
  @media (min-width: 1280px) {
    padding: 0;
    margin-right: calc(100vw - 1280px + (100vw * 0.01));
    min-width: 30%;
    left: calc(48vw - (-100vw * 0.07));
  }
  @media (min-width: 1441px) {
    max-width: 460px;
    left: calc(46vw - (-100vw * 0.07));
  }
`;

const ProductDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 600px;

  @media (min-width: 1150px) {
    margin-bottom: 220px;
    justify-content: center;
    flex: 1;
  }
  @media (min-width: 1441px) {
    max-width: 460px;
  }
`;

const DetailArea = styled.div`
  max-width: 600px;
  text-align: center;

  @media (max-width: 1149px) {
    width: 100%;
    min-width: 300px;
  }

  & img {
    min-width: 300px;
    max-width: 600px;
    border: 1px solid var(--color-gray-100);
    @media (max-width: 1149px) {
      width: 100%;
    }
  }
`;

const TeaType = styled.p`
  font-size: 2rem;
  font-weight: var(--weight-light);
  color: var(--color-gray-400);
  padding: 4px 0;
`;

const Title = styled.p`
  font-size: 3rem;
  font-weight: var(--weight-bold);
  color: var(--color-sub-500);
  margin: 8px 0;
`;

const ItemPrice = styled.span`
  font-size: 2.4rem;
  font-weight: var(--weight-extrabold);
  color: var(--color-gray-500);
  margin: 10px 0;
`;

const HashTagArea = styled.div`
  margin: 14px 0;
  & > p {
    color: var(--color-sub-500);
    font-weight: var(--weight-bold);
    padding: 12px 0;
  }
`;

const HashTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  & button {
    cursor: default;
  }
`;

const QuantityHandler = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-gray-100);
  border-radius: 5px;
  padding: 12px;
  margin: 18px 0;

  & > p {
    color: var(--color-gray-500);
    margin: 0 4px 12px 4px;
    font-size: 1.4rem;
    font-weight: var(--weight-medium);
  }
`;

const CounterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    font-weight: var(--weight-bold);
    font-size: 1.8rem;
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: center;

  & > p {
    font-size: 1.2rem;
    font-weight: var(--weight-light);
    margin: 0 8px;
  }
`;

const CounterLayer = styled.div`
  width: 10rem;
  height: 3.5rem;
  border: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /* Firefox */
  & input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const QuantityWrapper = styled.input`
  font-size: var(--size-16);
  padding: 0;
  width: 3rem;
  height: 2rem;
  text-align: center;
  border: none;
  flex: 1;

  &:focus {
    outline: none;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainButtonWrapper = styled.div`
  width: 49%;
`;
