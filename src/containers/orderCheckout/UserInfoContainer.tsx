import { useRecoilValue } from "recoil";
import Info from "@/components/orderCheckout/Info";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";

const UserInfoContainer = () => {
  const userInfo = useRecoilValue(loggedInUserState);

  return (
    <>
      <Info title="이름" value={userInfo ? userInfo.name : ""} />
      <Info title="전화번호" value={userInfo ? userInfo.phone : ""} />
      <Info title="이메일" value={userInfo ? userInfo.email : ""} />
    </>
  );
};

export default UserInfoContainer;
