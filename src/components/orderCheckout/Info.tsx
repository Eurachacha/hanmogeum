import { styled } from "styled-components";

interface InfoProps {
  title: string;
  value: string;
}

const Info = ({ title, value }: InfoProps) => {
  return (
    <InfoLayer>
      <p>{title}</p>
      <p>{value}</p>
    </InfoLayer>
  );
};

export default Info;

const InfoLayer = styled.div`
  font-size: 1.6rem;
  padding: 0 4px;
  margin: 12px 0;

  display: flex;
  align-items: center;
  p:first-child {
    font-weight: var(--weight-bold);
    min-width: 60px;
  }

  p:last-child {
    font-weight: var(--weight-medium);
    margin: 0 10px;
    padding: 12px;
  }
`;
