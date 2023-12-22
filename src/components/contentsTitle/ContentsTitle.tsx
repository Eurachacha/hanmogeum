import styled from "styled-components";
import { CommonCustomStyle } from "@/types/customStyle";

interface ContentsTitleProps {
  title: string;
  customStyle?: CommonCustomStyle;
}

/**
 * 다음과 같은 방법으로 사용이 가능합니다.
 *
 * 기본 사용 방법
 *    <ContentsTitle title="로그인" />
 * 커스텀 스타일 사용 방법
 *    <ContentsTitle title="로그인" customStyle={{color:"red"}} />
 *
 */

const ContentsTitle = ({ title = "", customStyle = {} }: ContentsTitleProps) => {
  return (
    <ContentsTitleLayer $customStyle={customStyle}>
      <h1>{title}</h1>
    </ContentsTitleLayer>
  );
};

export default ContentsTitle;

const ContentsTitleLayer = styled.div<{ $customStyle: React.CSSProperties }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13rem;
  width: auto;
  color: var(--color-sub-500);
  h1 {
    font-size: 3.6rem;
    font-weight: var(--weight-bold);
  }
  ${(props) => props.$customStyle && { ...props.$customStyle }}
`;
