import styled, { RuleSet, css } from "styled-components";

interface ButtonProps {
  variant: "active" | "default";
  children: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const VARIANTS = {
  default: css`
    background-color: var(--color-gray-50);
    color: var(--color-gray-400);
    font-weight: var(--weight-regular);
  `,
  active: css`
    background-color: var(--color-sub-500);
    color: var(--color-gray-100);
    font-weight: var(--weight-bold);
  `,
};

const CategoryButton = ({ variant, children, onClick, disabled }: ButtonProps) => {
  const variantStyle = VARIANTS[variant];

  return (
    <StyledButton $variantStyle={variantStyle} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ $variantStyle: RuleSet<object> }>`
  ${(props) => props.$variantStyle}

  font-size: 1.4rem;
  border-radius: 2px;
  border: 0;
  padding: 6px 10px;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

export default CategoryButton;
