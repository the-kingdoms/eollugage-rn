import { Text, View } from "react-native";
import BottomTabNav from "./BottomTabMav";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import JoinWebViewContainer from "pages/JoinWebViewContainer";

export default function AppBase() {
  const [hasToken, setHasToken] = useState<boolean>(true);

  const getToken = async () => {
    const result = await SecureStore.getItemAsync("token");
    if (result) setHasToken(true);
    else setHasToken(false);
  };

  if (!hasToken) return <JoinWebViewContainer />;

  return <BottomTabNav />;
}
