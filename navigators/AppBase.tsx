import BottomTabNav from "./BottomTabNav";
import JoinWebViewContainer from "pages/JoinWebViewContainer";
import { useAtom } from "jotai";
import { pathnameAtom, storeIdAtom } from "datas/atoms";
import { getStoreId } from "@utils/parsePathname";

export default function AppBase() {
  const [pathname] = useAtom(pathnameAtom);
  const [, setStoreId] = useAtom(storeIdAtom);

  const currentStoreId = getStoreId(pathname);
  console.log("currentStoreId:", currentStoreId);

  if (currentStoreId.length > 0 && currentStoreId !== "join") {
    setStoreId(currentStoreId);
    return <BottomTabNav />;
  }
  return <JoinWebViewContainer />;
}
