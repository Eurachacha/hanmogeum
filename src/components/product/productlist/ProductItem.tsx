import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProductItemLabel from "./ProductItemLabel";
import { Product } from "@/types/products";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const navigate = useNavigate();

  return (
    <ProductItemLayer onClick={() => navigate(`/products/${product._id}`)}>
      <ProductItemImageWrapper $imageUrl={product.mainImages}>
        <StyledLabel>
          <li>
            <ProductItemLabel padding="4px 8px" margin="0 8px 0 0" variant="new">
              new
            </ProductItemLabel>
            <ProductItemLabel padding="4px 8px" margin="0 8px 0 0" variant="best">
              best
            </ProductItemLabel>
          </li>
          <li>
            <ProductItemLabel padding="4px 8px" margin="0 0 8px 0" variant="decaf">
              디카페인
            </ProductItemLabel>
          </li>
        </StyledLabel>
      </ProductItemImageWrapper>

      <ProductItemContentWrapper>
        <ul>
          <StyledTeaType>
            <p>{product.extra.teaType}</p>
          </StyledTeaType>
          <StyledName>
            <h3>{product.name}</h3>
          </StyledName>
          <StyledPrice>
            <h2>{product.price}</h2>
          </StyledPrice>

          <StyledHashTag>
            <p>{product.extra.hashTag}</p>
          </StyledHashTag>
        </ul>
      </ProductItemContentWrapper>
    </ProductItemLayer>
  );
};

export default ProductItem;

const ProductItemLayer = styled.div`
  background-color: var(--color-white);

  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const ProductItemImageWrapper = styled.div<{ $imageUrl: string[] }>`
  width: 100%;
  aspect-ratio: 1/0.7;
  overflow: hidden;

  background: url(${(props) => props.$imageUrl}) no-repeat;
  background-size: cover;
`;
const StyledLabel = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 12px 14px;
`;
const ProductItemContentWrapper = styled.div`
  padding: 18px 14px;
`;

const StyledTeaType = styled.li`
  font-size: 1.2rem;
  color: var(--color-gray-300);

  margin-bottom: 10px;
`;

const StyledName = styled.li`
  line-height: 2.4rem;
`;

const StyledPrice = styled.li`
  text-align: right;
  font-weight: var(--weight-extrabold);

  margin-top: 10px;
`;

const StyledHashTag = styled.li`
  & ::before {
    content: "";

    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color-gray-100);

    margin-top: 20px;
    margin-bottom: 20px;
  }

  color: var(--color-gray-300);
  font-size: 1.2rem;
  line-height: 2.4rem;
`;
