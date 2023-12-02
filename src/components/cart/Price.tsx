import { styled } from "styled-components";

interface PriceProps {
  priceTitle: string;
  number: number;
}
const Price = ({ priceTitle, number }: PriceProps) => {
  return (
    <PriceLayer>
      <p>{priceTitle}</p>
      <p>{number.toLocaleString()}원</p>
    </PriceLayer>
  );
};

export default Price;

const PriceLayer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  padding: 14px 0;
  width: 100%;

  p:last-child {
    font-size: 1.8rem;
    font-weight: var(--weight-semibold);
  }
`;
