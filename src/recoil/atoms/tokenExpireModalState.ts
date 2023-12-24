import { atom } from "recoil";

const tokenExpireModalState = atom<boolean>({
  key: "tokenExpireModalState",
  default: false,
});

export default tokenExpireModalState;
