import styled, { RuleSet, css } from "styled-components";

interface LabelProps {
  variant: "new" | "best" | "decaf";
  children: string;
}

const VARIANTS = {
  new: css`
    background-color: var(--color-sub-500);
  `,

  best: css`
    background-color: var(--color-main);
  `,

  decaf: css`
    background-color: var(--color-gray-500);
  `,
}

const ProductItemLabel = ({ variant, children }: LabelProps) => {
  const variantStyle = VARIANTS[variant];

  return (
    <ProductItemLabelLayer $variantStyle={variantStyle}>
      {children}
    </ProductItemLabelLayer>
  );
};
export default ProductItemLabel;


const ProductItemLabelLayer = styled.span<{ $variantStyle: RuleSet<object> }>`
  ${(props) => props.$variantStyle}

  color: var(--color-white);

  border-radius: 5px;
  border: 0;

  padding: 4px 8px;
  font-size: 1.2rem;

  cursor: pointer;
`;

