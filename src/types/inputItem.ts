import { InputProps } from "@/types/input";

export interface CommonCustomStyle {
  width?: string;
  height?: string;
  "font-size"?: string;
  color?: string;
  margin?: string;
  padding?: string;
}
export interface ItemInputProps {
  title?: string | null;
  isTitleImportant?: boolean;

  // input
  inputProps?: InputProps;
  isInputExpand?: boolean;
  showValidationMessage?: boolean;
  validationMessage?: string;

  // button
  includeButton?: boolean;
  buttonValue?: string | undefined;
  buttonOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  buttonDisabled?: boolean;

  // custom style
  titleCustomStyle?: CommonCustomStyle;
  itemInputCustomStyle?: CommonCustomStyle;
  inputCustomStyle?: CommonCustomStyle;
  buttonCustomStyle?: CommonCustomStyle;
}
