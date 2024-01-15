import styled from "styled-components";
import { PropsWithChildren } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { ItemInputProps } from "@/types/inputItem";

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
const ItemInput = ({
  title = null,
  isTitleImportant = false,

  // button
  buttonValue = "",
  buttonOnClick = () => {},
  buttonDisabled = false,
  includeButton = false,

  // input
  isInputExpand = false,
  inputProps = { value: "", onChange: () => {} },
  showValidationMessage = false,
  validationMessage = "",

  // custom style
  titleCustomStyle = {},
  itemInputCustomStyle = {},
  inputCustomStyle = {},
  buttonCustomStyle = {},
  children,
}: PropsWithChildren<ItemInputProps>) => {
  return (
    <ItemInputLayer>
      <ItemInputWrapper $itemInputCustomStyle={itemInputCustomStyle}>
        {title && (
          <TitleWrapper $titleCustomStyle={titleCustomStyle}>
            {title}
            {isTitleImportant && <IsTitleImportant>*</IsTitleImportant>}
          </TitleWrapper>
        )}
        {children}
        <InputWrapper $inputCustomStyle={inputCustomStyle}>
          <Input {...inputProps} />
        </InputWrapper>
        {(includeButton || !isInputExpand) && (
          <ButtonWrapper onClick={buttonOnClick} $buttonCustomStyle={buttonCustomStyle}>
            {includeButton && <Button disabled={buttonDisabled} value={buttonValue} size="md" variant="sub" />}
          </ButtonWrapper>
        )}
      </ItemInputWrapper>
      {showValidationMessage && <ValidationMessage>{validationMessage}</ValidationMessage>}
    </ItemInputLayer>
  );
};

export default ItemInput;

const ItemInputLayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const ItemInputWrapper = styled.div<{ $itemInputCustomStyle: React.CSSProperties }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  gap: 1rem;

  ${(props) => props.$itemInputCustomStyle && { ...props.$itemInputCustomStyle }}
`;
const TitleWrapper = styled.span<{ $titleCustomStyle: React.CSSProperties }>`
  display: flex;

  font-weight: var(--weight-bold);
  min-width: 10rem;
  ${(props) => props.$titleCustomStyle && { ...props.$titleCustomStyle }}
`;
const IsTitleImportant = styled.span`
  color: var(--color-red);
`;
const InputWrapper = styled.div<{ $inputCustomStyle: React.CSSProperties }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  flex-grow: 1;
  input {
    padding: 1.2rem;
    font-size: 1.6rem;
    height: 100%;
  }
  ${(props) => props.$inputCustomStyle && { ...props.$inputCustomStyle }}
`;
const ValidationMessage = styled.div`
  color: var(--color-red);
  font-size: 1.3rem;
`;

const ButtonWrapper = styled.div<{ $buttonCustomStyle: React.CSSProperties }>`
  width: 11rem;
  font-size: 1.6rem;
  ${(props) => props.$buttonCustomStyle && { ...props.$buttonCustomStyle }}
`;
