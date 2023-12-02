import { styled } from "styled-components";
import CartItemsContainer from "@/containers/CartItemsContainer";
import PriceInfo from "@/components/cart/PriceInfo";

const CartPage = () => {
  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <Content>
        <CartItemsContainer />
        <PriceInfo />
      </Content>
    </>
  );
};

export default CartPage;

const PageTitle = styled.section`
  color: var(--color-main);
  font-size: 3rem;
  font-weight: var(--weight-bold);
  padding: 30px 10px;
`;

const Content = styled.section`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
