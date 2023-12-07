import { publicInstance } from "../instance";
import { ResponseStateCode } from "../../types/code";

const codeApi = {
  getCode: () => publicInstance.get<ResponseStateCode>(`/codes`),
};

export default codeApi;
