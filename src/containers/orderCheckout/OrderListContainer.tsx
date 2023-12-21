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
        imgUrl={`${import.meta.env.VITE_API_BASE_URL}${orderData.mainImages[0].url}`}
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
            imgUrl={`${import.meta.env.VITE_API_BASE_URL}${item.product.image.url}`}
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
