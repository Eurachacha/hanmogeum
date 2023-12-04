import styled from "styled-components";

interface OrderItemProps {
  imgUrl: string;
  name: string;
  quantity: number;
  priceSum: number;
}

const OrderItem = ({ imgUrl, name, quantity, priceSum }: OrderItemProps) => {
  return (
    <OrderItemLayer>
      <ItemLeft>
        <ImageWrapper>
          <img src={imgUrl} alt={name} width="100%" />
        </ImageWrapper>
        <p>{name}</p>
      </ItemLeft>
      <ItemRight>
        <p>{priceSum.toLocaleString()}원</p>
        <span>/</span>
        <p>{quantity}개</p>
      </ItemRight>
    </OrderItemLayer>
  );
};

export default OrderItem;

const OrderItemLayer = styled.li`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid var(--color-gray-100);
  padding: 10px;
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;

  p {
    font-size: 1.6rem;
    margin: 0 12px;
  }
`;

const ImageWrapper = styled.div`
  max-width: 80px;
  border: 1px solid var(--color-gray-50);
`;

const ItemRight = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  p {
    font-size: 1.6rem;
    font-weight: var(--weight-bold);
  }

  span {
    color: var(--color-gray-300);
    padding: 0 8px;
  }
`;
