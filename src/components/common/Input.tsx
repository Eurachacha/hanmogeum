import styled, { css, RuleSet } from "styled-components";
import { InputProps } from "@/types/input";

const Input = ({
  type = "text",
  placeholder = "",
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onKeyDown = () => {},
  value,
  disabled = false,
  inputStyle = "normal",
}: InputProps) => {
  const currentStyle = INPUT_STYLES[inputStyle];
  return (
    <InputContainer
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      disabled={disabled}
      $inputStyle={currentStyle}
    ></InputContainer>
  );
};

const INPUT_STYLES = Object.freeze({
  normal: css`
    &:focus {
      outline: none;
    }
    border: 1px solid var(--color-gray-200);
  `,
});

const InputContainer = styled.input<{ $inputStyle: RuleSet<object> }>`
  ${(props) => props.$inputStyle}

  border-radius: var(--radius-input);
  border-style: solid;
  border-width: 1px;
`;

export default Input;
