import { atom } from "recoil";
import { FlattenData } from "@/types/code";

const flattenCodeState = atom<FlattenData | {}>({
  key: "flattenCodeState",
  default: {},
});

export default flattenCodeState;
