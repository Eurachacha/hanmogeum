import styled from "styled-components";

interface ContainerHeaderProps {
  title: string;
}

const ContainerHeader = ({ title }: ContainerHeaderProps) => {
  return <ContainerHeaderLayer>{title}</ContainerHeaderLayer>;
};

const ContainerHeaderLayer = styled.div`
  width: 100%;
  height: 5rem;
  font-weight: var(--weight-bold);
  font-size: 2.4rem;
  border-bottom: 1px solid var(--color-black);
`;

export default ContainerHeader;
