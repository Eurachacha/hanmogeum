/**
 * InputType : input태그의 type 형태 중 글자 입력 형태의 목록
 */
type InputType = "text" | "email" | "password" | "search" | "tel" | "url";

/**
 * inputStyle : 정의된 input 태그의 style 목록
 */
type InputStyle = "normal";

/**
 * Input 컴포넌트의 props
 */
export interface InputProps {
  type?: InputType;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
  inputStyle?: InputStyle;
}
