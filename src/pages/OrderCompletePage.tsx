import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";

const OrderCompletePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <OrderCompletePageLayer>
        <p>주문이 완료되었습니다!</p>
        <ButtonArea>
          <ButtonWrapper onClick={() => navigate("/")}>
            <Button value="계속 쇼핑하기" size="md" variant="sub" />
          </ButtonWrapper>
          <ButtonWrapper onClick={() => navigate("/mypage/orders")}>
            <Button value="주문내역 확인하기" size="md" variant="point" />
          </ButtonWrapper>
        </ButtonArea>
      </OrderCompletePageLayer>
    </div>
  );
};

export default OrderCompletePage;

const OrderCompletePageLayer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 2rem;
    font-weight: var(--weight-bold);
  }
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ButtonWrapper = styled.div`
  margin: 8px 10px;
  min-width: 140px;
`;
