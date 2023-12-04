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
  margin-bottom: ${(props) => props.$marginBottom};
  display: flex;
  align-items: center;

  p {
    min-width: 60px;
    font-weight: var(--weight-bold);
  }

  input {
    min-width: 300px;
    height: 45px;
    margin: 0 4px;
  }

  input::placeholder {
    color: var(--color-gray-200);
    font-weight: var(--weight-light);
  }
`;
