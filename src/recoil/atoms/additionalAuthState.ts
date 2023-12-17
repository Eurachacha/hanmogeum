import { atom } from "recoil";

const additionalAuthState = atom({
  key: "additionalAuthState",
  default: false,
});

export default additionalAuthState;
