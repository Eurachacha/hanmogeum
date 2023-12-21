import styled from "styled-components";
import Button from "@/components/common/Button";
import Login from "@/components/login/Login";
import ContentsTitle from "@/components/contentsTitle/ContentsTitle";
import ContainerHeader from "@/components/mypage/ContainerHeader.";

const MyProfileLoginContainer = () => {
  return (
    <>
      <ContainerHeader title="내 정보 변경" />
      <ContentsTitle title="내 정보 변경"></ContentsTitle>
      <Login isAdditionalAuth redirectAfterLogin="/mypage/profile/modify">
        <ButtonWrapper>
          <Button value="로그인" size="sm" variant="point" />
        </ButtonWrapper>
      </Login>
    </>
  );
};

export default MyProfileLoginContainer;

const ButtonWrapper = styled.div`
  width: 100%;
  & > * {
    height: 5.2rem;
    margin-top: 1.5rem;
    font-size: 1.8rem;
    font-weight: var(--weight-semibold);
  }
`;
