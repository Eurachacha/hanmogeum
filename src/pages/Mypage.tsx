import { Outlet } from "react-router-dom";
import MypageLayoutContainer from "@/containers/mypage/MypageLayoutContainer";

const MyPage = () => {
  return (
    <MypageLayoutContainer>
      <Outlet />
    </MypageLayoutContainer>
  );
};

export default MyPage;
