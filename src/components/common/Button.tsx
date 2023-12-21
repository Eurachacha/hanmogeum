import styled, { RuleSet, css } from "styled-components";

interface ButtonProps {
  value: string;
  disabled?: boolean;
  size: "sm" | "md" | "lg";
  variant: "point" | "sub" | "normal";
}

interface CustomProperties {
  $sizeStyle: RuleSet<object>;
  $variantStyle: RuleSet<object>;
}

const SIZES = {
  sm: css`
    padding: 1rem;
    font-size: 1.4rem;
    font-weight: var(--weight-regular);
  `,
  md: css`
    padding: 1.2rem;
    font-size: 1.6rem;
    font-weight: var(--weight-semibold);
  `,
  lg: css`
    padding: 1.6rem;
    font-size: 1.8rem;
    font-weight: var(--weight-extrabold);
  `,
};

const VARIANTS = {
  point: css`
    color: var(--color-white);
    background-color: var(--color-sub-500);
    border: none;
  `,
  sub: css`
    color: var(--color-sub-500);
    background-color: var(--color-white);
    border: 1px solid var(--color-sub-500);
  `,
  normal: css`
    color: var(--color-black);
    background-color: var(--color-white);
    border: 1px solid var(--color-black);
    &:hover {
      background-color: var(--color-gray-50);
    }
  `,
};

const Button = ({ value, disabled = false, size, variant }: ButtonProps) => {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];

  return (
    <ButtonContainer disabled={disabled} $sizeStyle={sizeStyle} $variantStyle={variantStyle}>
      {value}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<CustomProperties>`
  ${(props) => props.$sizeStyle}
  ${(props) => props.$variantStyle}

  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: var(--radius-button);
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;
