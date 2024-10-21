import BottomTabNav from "./BottomTabNav";
import JoinWebViewContainer from "pages/JoinWebViewContainer";
import { useAtom } from "jotai";
import { pathnameAtom, storeIdAtom } from "datas/atoms";
import { parsePathname } from "@utils/parsePathname";

export default function AppBase() {
  const [pathname] = useAtom(pathnameAtom);
  const [, setStoreId] = useAtom(storeIdAtom);

  const currentStoreId = parsePathname(pathname);
  if (currentStoreId.length > 0) {
    setStoreId(currentStoreId);
    return <BottomTabNav />;
  }
  return <JoinWebViewContainer />;
}
