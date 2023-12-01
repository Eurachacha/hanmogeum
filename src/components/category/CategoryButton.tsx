import styled, { RuleSet, css } from "styled-components";

interface ButtonProps {
  variant: "active" | "default";
  children: string;
  onClick: () => void;
}

const VARIANTS = {
  default: css`
    background-color: var(--color-gray-100);
    color: var(--color-black);
  `,
  active: css`
    background-color: var(--color-sub-500);
    color: var(--color-gray-100);
    font-weight: var(--weight-bold);
  `,
};

const CategoryButton = ({ variant, children, onClick }: ButtonProps) => {
  const variantStyle = VARIANTS[variant];

  return (
    <StyledButton $variantStyle={variantStyle} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ $variantStyle: RuleSet<object> }>`
  ${(props) => props.$variantStyle}

  border-radius: 2px;
  border: 0;

  padding: 10px 18px;

  cursor: pointer;
`;

export default CategoryButton;
