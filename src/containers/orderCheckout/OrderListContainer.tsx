import OrderItem from "@/components/orderCheckout/OrderItem";
import { CartItem } from "@/types/cart";
import { OrderFromDetailPage } from "@/types/orders";

interface OrderListContainerProps {
  cartData: CartItem[];
  orderData: OrderFromDetailPage;
}

const OrderListContainer = ({ cartData, orderData }: OrderListContainerProps) => {
  if (orderData) {
    return (
      <OrderItem
        imgUrl={orderData.mainImages[0]}
        name={orderData.name}
        quantity={orderData.quantityInput}
        priceSum={orderData.price * orderData.quantityInput}
      />
    );
  }
  return (
    <>
      {cartData.map((item, idx) => {
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
