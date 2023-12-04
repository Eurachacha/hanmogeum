import { PropsWithChildren } from "react";
import styled from "styled-components";

interface FormInputProps {
  title: string;
  $marginBottom?: string;
}

const FormInput = ({ children, title, $marginBottom = "14px" }: PropsWithChildren<FormInputProps>) => {
  return (
    <FormInputLayer $marginBottom={$marginBottom}>
      <p>{title}</p>
      {children}
    </FormInputLayer>
  );
};

export default FormInput;

const FormInputLayer = styled.div<{ $marginBottom: string }>`
  padding: 0 4px;
  margin-bottom: ${(props) => props.$marginBottom};
  display: flex;
  align-items: center;

  p {
    min-width: 60px;
    font-weight: var(--weight-bold);
  }

  input {
    width: 300px;
    min-width: 200px;
    height: 45px;
    padding: 8px 12px;
    margin-left: 14px;
    margin-right: 4px;
  }

  input::placeholder {
    color: var(--color-gray-200);
    font-weight: var(--weight-light);
  }
`;
