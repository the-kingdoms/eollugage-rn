import CustomStatusBar from "@components/CustomStatusBar";
import WebviewContainer from "@components/container/WebViewContainer";
import { Fragment, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppBase from "navigators/AppBase";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

if (__DEV__) {
  require("./ReactotronConfig");
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Medium: require("./assets/font/Pretendard-Medium.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <CustomStatusBar />
      <NavigationContainer>
        <AppBase />
      </NavigationContainer>
    </View>
  );
}
