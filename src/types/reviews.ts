// POST/replies 구매 후기 등록
export interface RequestCreateReview {
  order_id: number;
  product_id: number;
  rating: number;
  content: string;
}

export interface ResponseCreateReview {
  ok: number;
  item: ReviewItem;
}

interface ReviewItem extends RequestCreateReview {
  user_id: number;
  _id: number;
  createdAt: string;
}

export interface ProductReview {
  _id: number;
  rating: number;
  content: string;
  createdAt: string;
  userName: string;
}
