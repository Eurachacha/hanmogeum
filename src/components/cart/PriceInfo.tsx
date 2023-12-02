import styled from "styled-components";

const PriceInfo = () => {
  return (
    <PriceInfoLayer>
      <Price>
        <p>선택 상품 금액</p>
        <p>10,000원</p>
      </Price>
      <Price>
        <p>배송비</p>
        <p>3,000원</p>
      </Price>
      <Price>
        <p>총 결제 금액</p>
        <p>13,000원</p>
      </Price>
      <button style={{ width: "100%" }}>구매하기</button>
    </PriceInfoLayer>
  );
};

export default PriceInfo;

const PriceInfoLayer = styled.div`
  background-color: var(--color-gray-100);
  margin-left: 1rem;
  min-width: 250px;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  padding: 10px 16px;
  width: 100%;
`;
