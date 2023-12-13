import styled, { RuleSet, css } from "styled-components";

interface ContainerHeaderProps {
  title: string;
  variant?: "main" | "sub";
}

interface CustomProperties {
  $variantStyle: RuleSet<object>;
}

const VARIANTS = {
  main: css`
    border-bottom: 1px solid var(--color-black);
  `,
  sub: css`
    border-bottom: 1px solid var(--color-gray-100);
  `,
};

const ContainerHeader = ({ title, variant = "main" }: ContainerHeaderProps) => {
  const variantStyle = VARIANTS[variant];
  return <ContainerHeaderLayer $variantStyle={variantStyle}>{title}</ContainerHeaderLayer>;
};

const ContainerHeaderLayer = styled.div<CustomProperties>`
  ${(props) => props.$variantStyle}
  width: 100%;
  height: 5rem;
  font-weight: var(--weight-bold);
  font-size: 2.4rem;
  border-bottom: 1px solid var(--color-black);
  border-bottom: 1px solid var(--color-gray-200);
`;

export default ContainerHeader;
