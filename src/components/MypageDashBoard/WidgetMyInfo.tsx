import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import HanmogeumIcon from "@/assets/icons/hanmogeumLeaf.svg?react";
import Button from "@/components/common/Button";
import { getUserNameState } from "@/recoil/selectors/loggedInUserSelector";

const WidgetMyInfo = () => {
  const navigate = useNavigate();
  const currentUserName = useRecoilValue(getUserNameState);

  const myProfileHandleClick = () => {
    // TODO: 내 정보 확인 페이지로 이동하도록 함 (수정페이지X)
    navigate("/mypage/profile");
  };

  return (
    <DashBardMyInfoLayout>
      <div>
        <HanmogeumIcon />
      </div>
      <ContentsWrapper>
        <UserInfoWrapper>
          <span>{`${currentUserName} 님, 안녕하세요.`}</span>
        </UserInfoWrapper>
        <ButtonWrapper onClick={myProfileHandleClick}>
          <Button value="내 정보 관리" size="sm" variant="point"></Button>
        </ButtonWrapper>
      </ContentsWrapper>
    </DashBardMyInfoLayout>
  );
};

const DashBardMyInfoLayout = styled.div`
  align-items: center;
  display: flex;
  gap: 2rem;
`;
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  width: 100%;
`;
const UserInfoWrapper = styled.div`
  font-weight: var(--weight-bold);
  font-size: 1.6rem;
`;
const ButtonWrapper = styled.div``;

export default WidgetMyInfo;
