import { InputType, InputProps } from "./input";
import { MainImageType } from "./products";

// 마이페이지 > 주문 내역
export interface ResponseDataMyOrderList {
  ok: number;
  item: MyOrderItem[] | [];
}

export interface MyOrderItem {
  _id: number;
  user_id: number;
  state: string;
  products: Product[];
  cost: Cost;
  shippingInfo: ShippingInfo;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingInfo {
  name: string;
  phone: string;
  address: ShippingAddress;
}

export interface ShippingAddress {
  name?: string;
  value?: string;
  detailValue?: string;
}

export interface Product {
  _id: number;
  seller_id: number;
  state: string;
  name: string;
  image: MainImageType;
  quantity: number;
  price: number;
  reply_id: number;
  delivery: Delivery;
  reply: Reply;
}

export interface Delivery {
  company: string;
  trackingNumber: string;
  url: string;
}

export interface Reply {
  rating: number;
  content: string;
  createdAt: string;
}

export interface Cost {
  products: number;
  shippingFees: number;
  discount: Discount;
  total: number;
}

export interface Discount {
  products: number;
  shippingFees: number;
}

// 마이페이지 > 내정보 수정
export interface InputDataType {
  title: string;
  showValidationMessage: boolean;
  validationMessage?: string;
  type?: InputType;
  isTitleImportant?: boolean;
  inputProps: InputProps;
  includeButton?: boolean;
  buttonValue?: string;
  buttonOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  buttonDisabled?: boolean;
}
export interface SignUpDataType {
  email: string;
  password: string;
  passwordAgain: string;
  name: string;
  phoneNumber: string;
  address: string;
  addressDetail: string;
}

// API Props

export interface getMyPageOrderListProps {
  state?: string;
  createdAt?: {
    startDate: string;
    endDate: string;
  };
}
