import styled from "styled-components";
import { PropsWithChildren } from "react";
import NavigationMenu from "@/components/mypage/NavigationMenu";
import DashBoardContainer from "./DashBoardContainer";

const MypageLayoutContainer = ({ children }: PropsWithChildren) => {
  return (
    <MypageLayoutContainerLayer>
      <DashBoardContainer />
      <MyPageWrapper>
        <MyPageNavigationWrapper>
          <NavigationMenu />
        </MyPageNavigationWrapper>
        <ContentsWrapper>{children}</ContentsWrapper>
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
