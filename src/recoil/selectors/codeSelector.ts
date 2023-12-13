import { selectorFamily } from "recoil";
import { nestedCodeState } from "../atoms/codeState";
import { CodeWithSub } from "@/types/code";

/** 사용 코드 예)
 *  useRecoilValue(getProductCategoryCodeByValue({ oneDepthValue: "pack", twoDepthValue: "티백" })),
 */

type CodeByValue = Record<string, CodeWithSub>;
export const getProductCategoryCodeByValue = selectorFamily<
  CodeByValue | {},
  { oneDepthValue: string; twoDepthValue?: string }
>({
  key: "getProductCodeByValue",
  get:
    ({ oneDepthValue, twoDepthValue }) =>
    ({ get }) => {
      const codeInfo = get(nestedCodeState);
      if (codeInfo) {
        const oneDepthFound = codeInfo.productCategory.codes.find((codeItem) => {
          return codeItem.value === oneDepthValue;
        });
        if (twoDepthValue && oneDepthFound?.sub) {
          const twoDepthFound: CodeWithSub | undefined = oneDepthFound.sub.find((codeItem) => {
            return codeItem.value === twoDepthValue;
          });
          return twoDepthFound?.code || "";
        }
        return oneDepthFound?.code || "";
      }
      return "";
    },
});

export const getShippingCodeByValue = selectorFamily<string, { oneDepthValue: string }>({
  key: "getShippingCodeByValue",
  get:
    ({ oneDepthValue }) =>
    ({ get }) => {
      const codeInfo = get(nestedCodeState);
      if (codeInfo) {
        const oneDepthFound = codeInfo.orderState.codes.find((codeItem) => {
          return codeItem.value === oneDepthValue;
        });
        return oneDepthFound?.code || "";
      }
      return "";
    },
});
