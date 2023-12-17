import { useRecoilValue } from "recoil";
import { getUserTypeState } from "@/recoil/selectors/loggedInUserSelector";
import { AuthorizationProps } from "@/types/routeAuthorization";

/**
 * 사용자 권한이 allowedRoles에 충족한지 체크하는 커스텀 훅
 * @param param0 체크할 권한
 * @returns 충족 유/무
 */
const useAuthorization = ({ allowedRoles }: AuthorizationProps) => {
  const userType = useRecoilValue(getUserTypeState);
  if (allowedRoles.includes("all")) {
    return true;
  }

  if (allowedRoles.includes("guest") && userType === null) {
    return true;
  }

  // 입력한 권한과 사용자 권한이 일치하는 경우
  if (userType && allowedRoles.includes(userType)) {
    return true;
  }

  return false;
};

export default useAuthorization;
