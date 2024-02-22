import { setThemeAtom, webviewStyleAtom } from "datas/style";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { BackHandler, LayoutChangeEvent, SafeAreaView } from "react-native";
import { URL } from "react-native-url-polyfill";
import { WebView, WebViewNavigation } from "react-native-webview";

const uri = "http://192.168.0.33:3000";

interface WebviewContainerProps {
  onLayout?: (event: LayoutChangeEvent) => void;
}

function WebviewContainer({ onLayout }: WebviewContainerProps) {
  const webviewRef = useRef<WebView>(null);
  const [webviewNavigationState, setWebviewNavigationState] = useState<
    WebViewNavigation | undefined
  >(undefined);
  const [webviewStyle] = useAtom(webviewStyleAtom);
  const [, setTheme] = useAtom(setThemeAtom);

  useEffect(() => {
    const backAction = () => {
      if (webviewNavigationState?.canGoBack) {
        webviewRef.current?.goBack();
        return true;
      }
      return false;
    };
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [webviewNavigationState?.canGoBack]);

  useEffect(() => {
    if (webviewNavigationState?.url) {
      const url = new URL(webviewNavigationState.url);
      if (url.pathname === "/") setTheme("dark");
      else setTheme("light");
    }
  }, [webviewNavigationState]);

  return (
    <SafeAreaView style={webviewStyle.container} onLayout={onLayout}>
      <WebView
        style={webviewStyle.webview}
        ref={webviewRef}
        onNavigationStateChange={setWebviewNavigationState}
        source={{ uri }}
        allowsBackForwardNavigationGestures
      />
    </SafeAreaView>
  );
}
export default WebviewContainer;
