import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CartStorageItem } from "@/types/cart";
import { CART_CHECKED_KEY, CART_STORAGE_KEY } from "@/constants/localstorageKeys";

const { persistAtom: cartStatePersistAtom } = recoilPersist({ key: CART_STORAGE_KEY });
const { persistAtom: cartCheckedItemPersistAtom } = recoilPersist({ key: CART_CHECKED_KEY });

// 비로그인 상태에만 관리 / 로그인 시 combine 요청 후 초기화
export const cartState = atom<CartStorageItem[]>({
  key: "cartState",
  default: [],
  effects: [cartStatePersistAtom],
});

// 로그인 여부와 상관없이 관리
// 로그인 시 combine 후 cart length 만큼 전부 true로 설정
export const cartCheckedItemState = atom<number[]>({
  key: "cartCheckedItemState",
  default: [],
  effects: [cartCheckedItemPersistAtom],
});
