import { styled } from "styled-components";
import { useEffect, useState } from "react";
import CounterContainer from "@/containers/CounterContainer";
import CancelIcon from "@/assets/icons/cancel.svg?react";
import CheckedBoxIcon from "@/assets/icons/checkedBox.svg?react";
import UncheckedBoxIcon from "@/assets/icons/uncheckedBox.svg?react";
import { CartItemInfo } from "@/containers/CartItemListContainer";

interface CartItemProps {
  data: CartItemInfo;
  cartItems: CartItemInfo[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemInfo[]>>;
}

const CartItem = ({ data, cartItems, setCartItems }: CartItemProps) => {
  const [quantity, setQuantity] = useState(data.quantity);

  const handleCheckBox = () => {
    const targetItem = cartItems.find((item) => item.product_id === data.product_id);
    const targetIndex = cartItems.findIndex((item) => item.product_id === data.product_id);
    if (targetItem) {
      const newItems = [
        ...cartItems.slice(0, targetIndex),
        { ...targetItem, checked: !targetItem?.checked },
        ...cartItems.slice(targetIndex + 1),
      ];
      setCartItems(newItems);
    }
  };

  useEffect(() => {
    const targetItem = cartItems.find((item) => item.product_id === data.product_id);
    const targetIndex = cartItems.findIndex((item) => item.product_id === data.product_id);
    if (targetItem) {
      const newItems = [
        ...cartItems.slice(0, targetIndex),
        { ...targetItem, quantity: quantity },
        ...cartItems.slice(targetIndex + 1),
      ];
      setCartItems(newItems);
    }
  }, [quantity]);

  return (
    <CartItemLayer>
      <CartItemLeft>
        <CheckedBox onClick={handleCheckBox}>{data.checked ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}</CheckedBox>
        <ImageWrapper>
          {data.mainImages.map((src, idx) => {
            const itemKey = idx.toString();
            return <img key={itemKey} src={src} alt={data.name} width="100%" height="100%" />;
          })}
        </ImageWrapper>
        <ProductTitle>{data.name}</ProductTitle>
      </CartItemLeft>
      <CartItemRight>
        <CountPrice>
          <CounterContainer stock={data.stock} quantity={quantity} setQuantity={setQuantity} />
          <Price>{(data.price * quantity).toLocaleString()}원</Price>
        </CountPrice>
        <CancelIconWrapper style={{ width: 20, height: 20 }}>
          <CancelIcon />
        </CancelIconWrapper>
      </CartItemRight>
    </CartItemLayer>
  );
};

export default CartItem;

const CartItemLayer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-gray-100);
  padding: 8px;
  flex-wrap: wrap;
`;

const CartItemLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 30%;
`;

const CheckedBox = styled.div`
  margin: 0 4px;
  padding: 0 4px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  max-width: 7rem;
  max-height: 7rem;
  min-width: 4rem;
  margin: 0 12px;
  flex: 0.3;
  border: 1px solid var(--color-gray-100);
  padding: 4px;
  margin: 8px;
`;

const ProductTitle = styled.p`
  font-size: 1.6rem;
  flex: 1;
  line-height: initial;
  padding-right: 1.2rem;
  min-width: 10rem;
`;

const CartItemRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
`;

const CountPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: auto;
`;

const Price = styled.p`
  font-size: 1.8rem;
  font-weight: var(--weight-bold);
  text-align: right;
  margin: 0 1rem;
  min-width: 10rem;
`;

const CancelIconWrapper = styled.div`
  margin: 0 4px;
  cursor: pointer;
`;
