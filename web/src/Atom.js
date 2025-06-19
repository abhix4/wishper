import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: "userState",
  default: {
    email: "",
    userId: "",
    name: "",
    imageUrl: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const isThoughtUpdated = atom({
  key: "isThoughtUpdated",
  default: false
});
