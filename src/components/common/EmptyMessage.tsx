import styled from "styled-components";

const EmptyMessage = () => {
  return (
    <EmptyMessageLayer>
      <img src="/images/emptyTea.png" alt="empty" />
      <p>상품이 없습니다</p>
    </EmptyMessageLayer>
  );
};

export default EmptyMessage;

const EmptyMessageLayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;

  p {
    font-size: 2.6rem;
    font-weight: var(--weight-bold);
    color: var(--color-gray-100);
    margin: 20px;
  }
`;
