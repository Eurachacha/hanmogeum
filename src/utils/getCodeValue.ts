import { useRecoilValue } from "recoil";
import { flattenCodeState } from "@/recoil/atoms/codeState";

const getCodeValue = (stateCode: string) => {
  const flattenCodes = useRecoilValue(flattenCodeState);
  return flattenCodes[stateCode].value;
};

export default getCodeValue;
