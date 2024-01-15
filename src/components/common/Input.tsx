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
  name = "",
  disabled = false,
  inputStyle = "normal",
  customStyle = {},
  required = false,
  minLength,
  maxLength,
  min,
  max,
  readonly = false,
}: InputProps) => {
  const currentStyle = INPUT_STYLES[inputStyle];
  return (
    <InputContainer
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      disabled={disabled}
      $inputStyle={currentStyle}
      $customStyle={customStyle}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      min={min}
      max={max}
      readOnly={readonly}
    ></InputContainer>
  );
};

export default Input;

const INPUT_STYLES = Object.freeze({
  normal: css`
    &:focus {
      outline: none;
    }
    border: 1px solid var(--color-gray-200);
  `,
});

const InputContainer = styled.input<{ $inputStyle: RuleSet<object>; $customStyle: React.CSSProperties }>`
  ${(props) => props.$inputStyle};
  width: inherit;
  border-radius: var(--radius-input);
  border-style: solid;
  border-width: 1px;
  padding: 0 1rem;
  font-size: 1.5rem;

  ${(props) => props.$customStyle && { ...props.$customStyle }}
`;
