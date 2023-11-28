import { privateInstance } from "../instance";
import { RequestCreateReview, ResponseCreateReview } from "@/types/reviews";

const reviewApi = {
  // POST/replies
  postOrderReview: (data: RequestCreateReview) => privateInstance.post<ResponseCreateReview>("/replies", data),
};

export default reviewApi;
