import { StatusBarStyle } from "expo-status-bar";
import { atom } from "jotai";
import { Edges } from "react-native-safe-area-context";

export const pathnameAtom = atom<string>("");
export const storeIdAtom = atom<string>("");
export const isTabVisibleAtom = atom<boolean>(false);
export const statusbarAtom = atom<{ color: string; style: StatusBarStyle }>({ style: "dark", color: "#000" });
export const safeAreaAtom = atom<Edges>([]);
