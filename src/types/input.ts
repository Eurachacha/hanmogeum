/**
 * InputType : input태그의 type 형태 중 글자 입력 형태의 목록
 */
export type InputType = "text" | "email" | "password" | "search" | "tel" | "url";

/**
 * inputStyle : 정의된 input 태그의 style 목록
 */
export type InputStyle = "normal";

export interface CustomStyle {
  "font-size"?: string;
  color?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}

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
  name?: string;
  // 유효성 검사
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  inputStyle?: InputStyle; // 정의된 스타일을 적용
  customStyle?: CustomStyle; // 사용자 정의 스타일을 추가
}
