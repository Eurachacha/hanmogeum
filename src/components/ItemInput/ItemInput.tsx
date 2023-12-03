import styled from "styled-components";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface CommonCustomStyle {
  width?: string;
  height?: string;
  "font-size"?: string;
  color?: string;
  margin?: string;
  padding?: string;
}

/*
  title : input 타이틀
  isTitleImportant?: 타이틀에 중요표시 여부
  inputValue: input 값
  inputOnChange: input onChange 핸들러
  includeButton?: 버튼 클릭 포함 여/부
  isInputExpand?: input 칸을 버튼칸까지 확장 여/부

  // custom style
  titleCustomStyle?: title 스타일 세부 설정
  itemInputCustomStyle?: itemInput 스타일 세부 설정
  inputCustomStyle?: input 스타일 세부 설정
  buttonCustomStyle?: button 스타일 세부 설정
 */
interface ItemInputProps {
  title?: string | null;
  isTitleImportant?: boolean;
  inputValue: string;
  inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  includeButton?: boolean;
  isInputExpand?: boolean;

  // custom style
  titleCustomStyle?: CommonCustomStyle;
  itemInputCustomStyle?: CommonCustomStyle;
  inputCustomStyle?: CommonCustomStyle;
  buttonCustomStyle?: CommonCustomStyle;
}

const ItemInput = ({
  title = null,
  isTitleImportant = false,
  inputValue = "",
  inputOnChange = () => {},
  includeButton = false,
  isInputExpand = false,

  // custom style
  titleCustomStyle = {},
  itemInputCustomStyle = {},
  inputCustomStyle = {},
  buttonCustomStyle = {},
}: ItemInputProps) => {
  return (
    <ItemInputLayer $itemInputCustomStyle={itemInputCustomStyle}>
      {title && (
        <TitleWrapper $titleCustomStyle={titleCustomStyle}>
          {title}
          {isTitleImportant && <IsTitleImportant>*</IsTitleImportant>}
        </TitleWrapper>
      )}
      <InputWrapper $inputCustomStyle={inputCustomStyle}>
        <Input onChange={inputOnChange} value={inputValue} />
      </InputWrapper>
      {includeButton && !isInputExpand && (
        <ButtonWrapper $buttonCustomStyle={buttonCustomStyle}>
          {includeButton && <Button value="입력" size="md" variant="sub" />}
        </ButtonWrapper>
      )}
    </ItemInputLayer>
  );
};

const ItemInputLayer = styled.div<{ $itemInputCustomStyle: React.CSSProperties }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.4rem;
  gap: 1rem;
  ${(props) => props.$itemInputCustomStyle && { ...props.$itemInputCustomStyle }}
`;
const TitleWrapper = styled.span<{ $titleCustomStyle: React.CSSProperties }>`
  font-weight: var(--weight-extrabold);
  min-width: 10rem;
  ${(props) => props.$titleCustomStyle && { ...props.$titleCustomStyle }}
`;
const IsTitleImportant = styled.span`
  color: var(--color-red);
`;
const InputWrapper = styled.div<{ $inputCustomStyle: React.CSSProperties }>`
  width: auto;
  height: 100%;
  flex-grow: 1;
  input {
    height: 100%;
    padding: 1rem;
  }
  ${(props) => props.$inputCustomStyle && { ...props.$inputCustomStyle }}
`;
const ButtonWrapper = styled.div<{ $buttonCustomStyle: React.CSSProperties }>`
  width: 11rem;
  font-size: 1.6rem;
  ${(props) => props.$buttonCustomStyle && { ...props.$buttonCustomStyle }}
`;

export default ItemInput;
