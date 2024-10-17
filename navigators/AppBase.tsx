import { Text, View } from "react-native";
import BottomTabNav from "./BottomTabNav";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import JoinWebViewContainer from "pages/JoinWebViewContainer";
import * as SplashScreen from "expo-splash-screen";
import { getLoginToken } from "@utils/handleLoginToken";
import { useAtom } from "jotai";
import { hasTokenAtom, moveSignAtom } from "datas/atoms";

SplashScreen.preventAutoHideAsync();

export default function AppBase() {
  const [hasToken, setHasToken] = useAtom(hasTokenAtom);
  const [moveSign] = useAtom(moveSignAtom);

  const checkLoginToken = async () => {
    try {
      const token = await getLoginToken("access_token");
      setHasToken(!!token);
    } catch (error) {
      setHasToken(false);
    } finally {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    checkLoginToken();
  }, [moveSign]);

  if (hasToken === null) return null;

  if (!hasToken) return <JoinWebViewContainer />;

  return <BottomTabNav />;
}
