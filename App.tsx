import CustomStatusBar from "@components/CustomStatusBar";
import WebviewContainer from "@components/container/WebViewContainer";
import { Fragment, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppBase from "navigators/AppBase";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";
import * as Linking from "expo-linking";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAtom } from "jotai";
import { safeAreaAtom } from "datas/atoms";

if (__DEV__) {
  require("./ReactotronConfig");
}

const prefix = Linking.createURL("/");

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Medium: require("./assets/font/Pretendard-Medium.otf"),
    Regular: require("./assets/font/Pretendard-Regular.otf"),
    Bold: require("./assets/font/Pretendard-Bold.otf"),
    SCDream: require("./assets/font/SCDream-Bold.otf"),
  });

  const [safearea] = useAtom(safeAreaAtom);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        ManageNav: "manage/:storeId",
      },
    },
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }} edges={safearea}>
        <CustomStatusBar />
        <NavigationContainer linking={linking} fallback={<Text>로딩 중..</Text>}>
          <AppBase />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
