import BottomTabNav from "./BottomTabNav";
import { useAtom } from "jotai";
import { isLoggedInAtom, pathnameAtom, storeIdAtom } from "datas/atoms";
import { getStoreId } from "@utils/parsePathname";
import { useEffect, useState } from "react";
import JoinNav from "./JoinNav";

export default function AppBase() {
  const [pathname] = useAtom(pathnameAtom);
  const [storeId, setStoreId] = useAtom(storeIdAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const currentStoreId = getStoreId(pathname);

  useEffect(() => {
    if (storeId !== currentStoreId) setStoreId(currentStoreId);

    if (currentStoreId && currentStoreId.length > 0 && currentStoreId !== "join") setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [currentStoreId]);

  if (isLoggedIn) return <BottomTabNav />;
  return <JoinNav />;
}
