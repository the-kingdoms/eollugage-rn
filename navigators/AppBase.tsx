import BottomTabNav from "./BottomTabNav";
import JoinWebViewContainer from "pages/JoinWebViewContainer";
import { useAtom } from "jotai";
import { pathnameAtom, storeIdAtom } from "datas/atoms";
import { getStoreId } from "@utils/parsePathname";
import { useEffect, useState } from "react";

export default function AppBase() {
  const [pathname] = useAtom(pathnameAtom);
  const [storeId, setStoreId] = useAtom(storeIdAtom);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const currentStoreId = getStoreId(pathname);

  useEffect(() => {
    if (storeId !== currentStoreId) setStoreId(currentStoreId);

    if (currentStoreId && currentStoreId.length > 0 && currentStoreId !== "join") setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [currentStoreId]);

  if (isLoggedIn) return <BottomTabNav />;
  return <JoinWebViewContainer />;
}
