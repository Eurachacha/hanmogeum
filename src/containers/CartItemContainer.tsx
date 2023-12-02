import { useEffect, useState } from "react";
import CartItem from "@/components/cart/CartItem";
import { CartItemInfo } from "@/types/cart";

interface CartItemProps {
  data: CartItemInfo;
  cartItems: CartItemInfo[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemInfo[]>>;
}

const CartItemContainer = ({ data, cartItems, setCartItems }: CartItemProps) => {
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

  return <CartItem handleCheckBox={handleCheckBox} data={data} quantity={quantity} setQuantity={setQuantity} />;
};

export default CartItemContainer;
