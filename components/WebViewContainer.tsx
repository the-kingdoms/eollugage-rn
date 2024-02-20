import { setStatusBarStyle } from "expo-status-bar";
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

const uri = "172.30.1.40:3000";
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

  useEffect(() => {
    const backAction = () => {
      if (webviewNavigationState?.canGoBack) {
        webviewRef.current?.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (webviewNavigationState?.url) {
      const url = new URL(webviewNavigationState.url);
      setStatusBarStyle(url.pathname === "/" ? "dark" : "light");
    }
  }, [webviewNavigationState]);

  const sendMessage = (message: string) => {
    webviewRef.current?.postMessage(message);
  };

  const onMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);
  };
  return (
    <SafeAreaView style={styles.container} onLayout={onLayout}>
      <WebView
        style={styles.webview}
        ref={webviewRef}
        onNavigationStateChange={setWebviewNavigationState}
        onMessage={onMessage}
        source={{ uri }}
      />
    </SafeAreaView>
  );
}
export default WebviewContainer;
