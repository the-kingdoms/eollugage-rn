import IpcContainer from "@components/IpcContainer";
import NotificationContainer from "@components/NotificationContainer";
import onMessageHandler from "@components/ipc/onMessageHandler";
import IpcMessageAtom from "datas/message";
import { setThemeAtom, webviewStyleAtom } from "datas/style";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { BackHandler, LayoutChangeEvent, SafeAreaView } from "react-native";
import { URL } from "react-native-url-polyfill";
import { WebView, WebViewNavigation } from "react-native-webview";

const uri = "https://gage.eolluga.com";

interface WebviewContainerProps {
  onLayout?: (event: LayoutChangeEvent) => void;
}

function WebviewContainer({ onLayout }: WebviewContainerProps) {
  const webviewRef = useRef<WebView>(null);
  const [webviewNavigationState, setWebviewNavigationState] = useState<WebViewNavigation | undefined>(undefined);
  const [webviewStyle] = useAtom(webviewStyleAtom);
  const [, setTheme] = useAtom(setThemeAtom);
  const [, setIpcMessageAtom] = useAtom(IpcMessageAtom);

  useEffect(() => {
    const backAction = () => {
      if (webviewNavigationState?.canGoBack) {
        webviewRef.current?.goBack();
        return true;
      }
      return false;
    };
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
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
        onMessage={(e) => onMessageHandler(e, setIpcMessageAtom)}
        allowsBackForwardNavigationGestures
      />
      <NotificationContainer />
      {webviewRef.current && <IpcContainer webviewRef={webviewRef} />}
    </SafeAreaView>
  );
}
export default WebviewContainer;
