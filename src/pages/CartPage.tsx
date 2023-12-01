import { styled } from "styled-components";
import CartItemsContainer from "@/containers/CartItemsContainer";

const CartPage = () => {
  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <CartItemsContainer />
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
