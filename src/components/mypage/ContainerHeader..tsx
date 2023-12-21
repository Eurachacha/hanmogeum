import { PropsWithChildren } from "react";
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

const ContainerHeader = ({ title, variant = "main", children }: PropsWithChildren<ContainerHeaderProps>) => {
  const variantStyle = VARIANTS[variant];
  return (
    <ContainerHeaderLayer $variantStyle={variantStyle}>
      <TitleWrapper>{title}</TitleWrapper>
      {children}
    </ContainerHeaderLayer>
  );
};

export default ContainerHeader;

const ContainerHeaderLayer = styled.div<CustomProperties>`
  ${(props) => props.$variantStyle}
  display: flex;
  width: 100%;
  height: 5rem;
  border-bottom: 1px solid var(--color-black);
  border-bottom: 1px solid var(--color-gray-200);
`;

const TitleWrapper = styled.div`
  font-weight: var(--weight-bold);
  font-size: 2.4rem;
`;
