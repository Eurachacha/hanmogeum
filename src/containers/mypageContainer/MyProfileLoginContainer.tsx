import styled from "styled-components";
import Button from "@/components/common/Button";
import MypageLayoutContainer from "./MypageLayoutContainer";
import Login from "@/components/login/Login";
import ContentsTitle from "@/components/contentsTitle/ContentsTitle";

const MyProfileLoginContainer = () => {
  return (
    <MypageLayoutContainer ContentsTitle="내 정보 변경">
      <ContentsTitle title="내 정보 변경"></ContentsTitle>
      <Login redirectAfterLogin="/mypage/profile/modify">
        <ButtonWrapper>
          <Button value="로그인" size="sm" variant="point" />
        </ButtonWrapper>
      </Login>
    </MypageLayoutContainer>
  );
};

export default MyProfileLoginContainer;

const ButtonWrapper = styled.div`
  width: 100%;
  & > * {
    height: 5.2rem;
    margin-top: 1.5rem;
  }
`;
