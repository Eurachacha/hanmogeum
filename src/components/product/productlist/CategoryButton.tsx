import { useLocation } from "react-router-dom";
import styled, { RuleSet, css } from "styled-components";

interface ButtonProps {
  children: string;
  disabled?: boolean;
  code: string;
  toggleFilter: (id: string) => void;
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

const CategoryButton = ({ children, toggleFilter, code, disabled }: ButtonProps) => {
  const location = useLocation();
  const queryString = location.search;

  return (
    <StyledButton
      $variantStyle={queryString.includes(code) ? VARIANTS.active : VARIANTS.default}
      onClick={() => toggleFilter(code)}
      disabled={disabled}
    >
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
