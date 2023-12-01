import { styled } from "styled-components";
import { useEffect, useState } from "react";
import QuantityContainer from "@/containers/QuantityContainer";
import CancelIcon from "@/assets/icons/cancel.svg?react";
import CheckedBoxIcon from "@/assets/icons/checkedBox.svg?react";
import UncheckedBoxIcon from "@/assets/icons/uncheckedBox.svg?react";
import { CartItemInfo } from "@/containers/CartItemsContainer";

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
      <CheckedBox onClick={handleCheckBox}>{data.checked ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}</CheckedBox>
      <ImageWrapper>
        {data.mainImages.map((src, idx) => {
          const itemKey = idx.toString();
          return <img key={itemKey} src={src} alt={data.name} width="100%" height="100%" />;
        })}
      </ImageWrapper>
      <ProductTitle>{data.name}</ProductTitle>
      <QuantityContainer stock={data.stock} quantity={quantity} setQuantity={setQuantity} />
      <Price>{(data.price * quantity).toLocaleString()}원</Price>
      <CancelIconWrapper style={{ width: 20, height: 20 }}>
        <CancelIcon />
      </CancelIconWrapper>
    </CartItemLayer>
  );
};

export default CartItem;

const CartItemLayer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-gray-100);
  padding: 8px;
`;

const CheckedBox = styled.div`
  margin: 0 4px;
  padding: 0 4px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 10rem;
  height: 10rem;
  margin: 0 12px;
`;

const ProductTitle = styled.p`
  font-size: 2rem;
  flex: 1;
`;

const Price = styled.p`
  font-size: 2rem;
  font-weight: var(--weight-bold);
  margin: 0 2rem;
`;

const CancelIconWrapper = styled.div`
  margin: 0 4px;
  cursor: pointer;
`;
