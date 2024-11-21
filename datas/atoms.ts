import { StatusBarStyle } from "expo-status-bar";
import { atom } from "jotai";

export const pathnameAtom = atom<string>("");
export const storeIdAtom = atom<string>("");
export const isTabVisibleAtom = atom<boolean>(false);
export const statusbarAtom = atom<{ color: string; style: StatusBarStyle }>({ style: "dark", color: "#000" });
