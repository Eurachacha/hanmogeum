import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "@/types/users";
import { LOGIN_USER_INFO_KEY } from "@/constants/localstorageKeys";

const { persistAtom } = recoilPersist({ key: LOGIN_USER_INFO_KEY });

type LoggedInUserState = User | null;

const loggedInUserState = atom<LoggedInUserState>({
  key: "loggedInUserState",
  default: null,
  effects: [persistAtom],
});

export default loggedInUserState;
