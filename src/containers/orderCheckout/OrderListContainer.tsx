import { useEffect, useState } from "react";
import cartApi from "@/apis/services/cart";
import OrderItem from "@/components/orderCheckout/OrderItem";
import { CartItem } from "@/types/cart";

const OrderListContainer = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const fetchAllCartItems = async () => {
    try {
      const response = await cartApi.getAllItems();
      const { item } = response.data;
      setCartItems(item);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllCartItems();
  }, []);

  return (
    <div>
      {cartItems?.map((item, idx) => {
        const key = idx.toString();
        return (
          <OrderItem
            key={key}
            imgUrl={item.product.image}
            name={item.product.name}
            quantity={item.quantity}
            priceSum={item.product.price * item.quantity}
          />
        );
      })}
    </div>
  );
};

export default OrderListContainer;
