import { PropsWithChildren } from "react";
import styled from "styled-components";

interface OrderItemProps {
  productImageURL: string;
}

const OrderItem = ({ productImageURL, children }: PropsWithChildren<OrderItemProps>) => {
  return (
    <OrderItemLayer>
      <ItemWrapper>
        <ProductImageStyle>
          <img src={productImageURL} alt="" />
        </ProductImageStyle>
        {children}
      </ItemWrapper>
    </OrderItemLayer>
  );
};

export default OrderItem;

const OrderItemLayer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-product);
  height: 21rem;
  width: 100%;
  padding: 2.4rem;
  gap: 2.4rem;
`;

const ProductImageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18rem;
  height: 16rem;
  overflow: hidden;
  border-radius: 5px;
  & > img {
    height: 100%;
  }
`;
