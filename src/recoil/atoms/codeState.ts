import { atom } from "recoil";
import { CodeStateType } from "@/types/code";

const codeState = atom<CodeStateType | null>({
  key: "codeState",
  default: null,
});

export default codeState;
