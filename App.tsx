import CustomStatusBar from "@components/CustomStatusBar";
import WebviewContainer from "@components/container/WebViewContainer";
import { Fragment, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppBase from "navigators/AppBase";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";
import * as Linking from "expo-linking";

if (__DEV__) {
  require("./ReactotronConfig");
}

const prefix = Linking.createURL("/");

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

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        ManageNav: "manage/:storeId",
      },
    },
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <CustomStatusBar />
      <NavigationContainer linking={linking} fallback={<Text>로딩 중..</Text>}>
        <AppBase />
      </NavigationContainer>
    </View>
  );
}
