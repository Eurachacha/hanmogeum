import { atom } from "recoil";
import { FlattenData, NestedData } from "@/types/code";

export const flattenCodeState = atom<FlattenData>({
  key: "flattenCodeState",
  default: {},
});

export const nestedCodeState = atom<NestedData | null>({
  key: "nestedCodeState",
  default: null,
});
