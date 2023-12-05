import OrderItem from "@/components/orderCheckout/OrderItem";
import { CartItem } from "@/types/cart";

interface OrderListContainerProps {
  cartItems: CartItem[];
}

const OrderListContainer = ({ cartItems }: OrderListContainerProps) => {
  return (
    <>
      {cartItems.map((item, idx) => {
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
    </>
  );
};

export default OrderListContainer;
