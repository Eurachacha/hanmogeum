import styled, { RuleSet, css } from "styled-components";

interface LabelProps {
  variant: "new" | "best" | "decaf";
  padding: string;
  margin: string;
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

const ProductItemLabel = ({ variant, children, padding, margin }: LabelProps) => {
  const variantStyle = VARIANTS[variant];

  return (
    <ProductItemLabelLayer padding={padding} margin={margin} $variantStyle={variantStyle}>
      {children}
    </ProductItemLabelLayer>
  );
};
export default ProductItemLabel;


const ProductItemLabelLayer = styled.span<{ padding: string, margin: string, $variantStyle: RuleSet<object> }>`
  ${(props) => props.$variantStyle}

  color: var(--color-white);

  border-radius: 5px;
  border: 0;

  font-size: 1.2rem;

  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};

  cursor: pointer;
`;

