import styled, { css, RuleSet } from "styled-components";
/**
 * InputType : input태그의 type 형태 중 글자 입력 형태의 목록
 */
type InputType = "text" | "email" | "password" | "search" | "tel" | "url";

/**
 * inputStyle : 정의된 input 태그의 style 목록
 */
type InputStyle = "normal";

interface CustomStyle {
  "font-size"?: string;
  color?: string;
  padding?: string;
  margin?: string;
}

/**
 * Input 컴포넌트의 props
 */
interface InputProps {
  type?: InputType;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
  inputStyle?: InputStyle; // 정의된 스타일을 적용
  customStyle?: CustomStyle; // 사용자 정의 스타일을 추가
}

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
  customStyle = {},
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
      $customStyle={customStyle}
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

const InputContainer = styled.input<{ $inputStyle: RuleSet<object>; $customStyle: React.CSSProperties }>`
  ${(props) => props.$inputStyle};
  width: inherit;
  border-radius: var(--radius-input);
  border-style: solid;
  border-width: 1px;
  padding: 0 1rem;
  font-size: 1.6rem;

  ${(props) => props.$customStyle && { ...props.$customStyle }}
`;

export default Input;
