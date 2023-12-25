import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserTypeState } from "@/recoil/selectors/loggedInUserSelector";
import { AuthorizationProps } from "@/types/routeAuthorization";
import additionalAuthState from "@/recoil/atoms/additionalAuthState";

/**
 * 사용자 권한이 allowedRoles에 충족한지 체크하는 커스텀 훅
 * @param param0 체크할 권한
 * @returns 충족 유/무
 */
const useAuthorization = ({ allowedRoles, isAdditionalAuthRequired = false }: AuthorizationProps) => {
  const userType = useRecoilValue(getUserTypeState);
  const location = useLocation();
  const additionalAuthRequired = useRecoilValue(additionalAuthState);
  const [resultValue, setResultValue] = useState(false);

  useEffect(() => {
    if (isAdditionalAuthRequired && isAdditionalAuthRequired === true) {
      if (additionalAuthRequired === false) {
        setResultValue(false);
      }
    } else if (allowedRoles.includes("all")) {
      setResultValue(true);
    } else if (allowedRoles.includes("guest") && userType === null) {
      setResultValue(true);
    }
    // 입력한 권한과 사용자 권한이 일치하는 경우
    else if (userType && allowedRoles.includes(userType)) {
      setResultValue(true);
    } else {
      setResultValue(false);
    }
  }, [location, additionalAuthRequired]);

  return resultValue;
};

export default useAuthorization;
