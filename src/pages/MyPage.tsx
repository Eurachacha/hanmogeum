import { Outlet } from "react-router-dom";
import MyPageLayoutContainer from "@/containers/myPage/MyPageLayoutContainer";

const MyPage = () => {
  return (
    <MyPageLayoutContainer>
      <Outlet />
    </MyPageLayoutContainer>
  );
};

export default MyPage;
