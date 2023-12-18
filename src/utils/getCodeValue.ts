import { FlattenData } from "@/types/code";

const getCodeValue = (codes: FlattenData, stateCode: string) => {
  return codes[stateCode].value;
};

export default getCodeValue;
