import styled from "styled-components";
import { PropsWithChildren } from "react";
import NavigationMenu from "@/components/mypage/NavigationMenu";
import ContainerHeader from "@/components/mypage/ContainerHeader.";

interface MypageLayoutContainerProps {
  ContentsTitle: string;
}

const MypageLayoutContainer = ({ ContentsTitle, children }: PropsWithChildren<MypageLayoutContainerProps>) => {
  return (
    <MypageLayoutContainerLayer>
      <MyProfileWrapper></MyProfileWrapper>
      <MyPageWrapper>
        <MyPageNavigationWrapper>
          <NavigationMenu />
        </MyPageNavigationWrapper>
        <ContentsWrapper>
          <ContainerHeader title={ContentsTitle} />
          {children}
        </ContentsWrapper>
      </MyPageWrapper>
    </MypageLayoutContainerLayer>
  );
};
export default MypageLayoutContainer;

const MypageLayoutContainerLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;
const MyProfileWrapper = styled.div`
  background-color: var(--color-gray-100);
  display: flex;
  width: 100%;
  height: 26rem;
`;

const MyPageWrapper = styled.div`
  display: flex;
  gap: 2.5rem;
`;

const MyPageNavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;
