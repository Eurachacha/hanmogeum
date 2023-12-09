export interface ResponseStateCode {
  ok: number;
  item: CodeStateType;
}

export interface CodeStateType {
  flatten: FlattenData;
  nested: NestedData;
}

export type FlattenData = Record<string, FlattenDataItem>;

export interface FlattenDataItem {
  sort: number;
  code: string;
  value: string;
  depth?: number;
  parent?: string;
  discountRate?: number;
}

export interface NestedData {
  productCategory: ProductCategory;
  orderState: OrderState;
  membershipClass: MembershipClass;
}

export interface CodeWithSub {
  sort: number;
  code: string;
  value: string;
  parent?: string;
  depth: number;
  sub?: CodeWithSub[];
}

export interface ProductCategory {
  _id: string;
  title: string;
  codes: CodeWithSub[];
}

export interface OrderStateCode {
  sort: number;
  code: string;
  value: string;
}

export interface OrderState {
  _id: string;
  title: string;
  codes: OrderStateCode[];
}

export interface MembershipClassCode {
  sort: number;
  code: string;
  value: string;
  discountRate: number;
}

export interface MembershipClass {
  _id: string;
  title: string;
  codes: MembershipClassCode[];
}
