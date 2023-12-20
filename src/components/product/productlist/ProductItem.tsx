import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ProductItemLabel from "./ProductItemLabel";
import { Product } from "@/types/products";
import { flattenCodeState } from "@/recoil/atoms/codeState";

import getPriceFormat from "@/utils/getPriceFormat";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const navigate = useNavigate();
  const flattenCodes = useRecoilValue(flattenCodeState);
  const teaTypeCode = product.extra.teaType[0];

  const hashTagCode = product.extra.hashTag.map((item) => `#${flattenCodes[item].value}`);
  const priceKor = getPriceFormat({ price: product.price });

  return (
    <ProductItemLayer onClick={() => navigate(`/products/${product._id}`)}>
      <ProductItemImageWrapper>
        <StyledLabel>
          <li>
            {product.extra.isNew ? (
              <ProductItemLabel padding="4px 8px" margin="0 8px 0 0" variant="new">
                new
              </ProductItemLabel>
            ) : (
              <span></span>
            )}
            {product.extra.isBest ? (
              <ProductItemLabel padding="4px 8px" margin="0 8px 0 0" variant="best">
                best
              </ProductItemLabel>
            ) : (
              <span></span>
            )}
          </li>
          <li>
            {product.extra.isDecaf ? (
              <ProductItemLabel padding="4px 8px" margin="0 0 8px 0" variant="decaf">
                디카페인
              </ProductItemLabel>
            ) : (
              <span></span>
            )}
          </li>
        </StyledLabel>
        <img src={`${import.meta.env.VITE_API_BASE_URL}/${product.mainImages[0].url}`} alt="" />
      </ProductItemImageWrapper>

      <ProductItemContentWrapper>
        <ul>
          <StyledItemText>
            <StyledTeaType>
              <p>{flattenCodes[teaTypeCode].value}</p>
            </StyledTeaType>
            <StyledName>
              <h3>{product.name}</h3>
            </StyledName>
            <StyledPrice>
              <h2>{priceKor}</h2>
            </StyledPrice>
          </StyledItemText>

          <StyledHashTag>
            <p>{hashTagCode}</p>
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

const ProductItemImageWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 240px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;
const StyledLabel = styled.ul`
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;

  display: flex;
  justify-content: space-between;
`;
const ProductItemContentWrapper = styled.div`
  padding: 18px 14px;
`;

const StyledItemText = styled.div`
  height: 100px;
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
