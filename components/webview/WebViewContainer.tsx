import { statusBarStyleAtom } from "components/CustomStatusBar";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { URL } from "react-native-url-polyfill";
import { WebView, WebViewNavigation } from "react-native-webview";

const uri = "http://192.168.0.33:3000";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    color: "black",
  },
  webview: {
    backgroundColor: "black",
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});

interface WebviewContainerProps {
  onLayout?: (event: LayoutChangeEvent) => void;
}

function WebviewContainer({ onLayout }: WebviewContainerProps) {
  const webviewRef = useRef<WebView>(null);
  const [webviewNavigationState, setWebviewNavigationState] = useState<
    WebViewNavigation | undefined
  >(undefined);
  const [, setStatusBarStyle] = useAtom(statusBarStyleAtom);

  useEffect(() => {
    const backAction = () => {
      if (webviewNavigationState?.canGoBack) {
        webviewRef.current?.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [webviewNavigationState?.canGoBack]);

  useEffect(() => {
    if (webviewNavigationState?.url) {
      const url = new URL(webviewNavigationState.url);
      url.pathname === "/"
        ? setStatusBarStyle({
            barStyle: "light-content",
            backgroundColor: "black",
          })
        : setStatusBarStyle({
            barStyle: "dark-content",
            backgroundColor: "white",
          });
    }
  }, [webviewNavigationState]);

  return (
    <SafeAreaView style={styles.container} onLayout={onLayout}>
      <WebView
        style={styles.webview}
        ref={webviewRef}
        onNavigationStateChange={setWebviewNavigationState}
        source={{ uri }}
        allowsBackForwardNavigationGestures
      />
    </SafeAreaView>
  );
}
export default WebviewContainer;
