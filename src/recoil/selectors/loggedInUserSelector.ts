import { selector } from "recoil";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";

export const getUserIdState = selector({
  key: "userIdState",
  get: ({ get }) => {
    const userInfo = get(loggedInUserState);
    if (userInfo === null) {
      return null;
    }
    return userInfo._id;
  },
});

export const getUserTypeState = selector({
  key: "userTypeState",
  get: ({ get }) => {
    const userInfo = get(loggedInUserState);
    if (userInfo === null) {
      return null;
    }
    return userInfo.type;
  },
});
