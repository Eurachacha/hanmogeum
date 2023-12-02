import { selector } from "recoil";
import loggedInUserState from "../atoms/loggedInUserState";

const getUserIdState = selector({
  key: "userIdState",
  get: ({ get }) => {
    const userInfo = get(loggedInUserState);
    if (userInfo === null) {
      return null;
    }
    // response 데이터 구조에 담긴 "_id"명을 유지하기 위해 다음 줄은 eslint를 disable 처리 함
    // eslint-disable-next-line no-underscore-dangle
    return userInfo._id;
  },
});

export default getUserIdState;
