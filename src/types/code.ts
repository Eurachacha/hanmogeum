type Flatten = Record<string, FlattenCode>;

export interface FlattenCode {
  sort: number;
  code: string;
  value: string;
  parent?: string;
  depth: number;
}

export interface CodeStateType {
  flatten: Flatten;
}

export interface ResponseStateCode {
  ok: number;
  item: CodeStateType;
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
