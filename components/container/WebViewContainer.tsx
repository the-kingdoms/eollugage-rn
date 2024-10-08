import IpcContainer from "@components/container/IpcContainer";
import NotificationContainer from "@components/container/NotificationContainer";
import onMessageHandler from "@components/ipc/onMessageHandler";
import IpcMessageAtom from "datas/message";
import { setThemeAtom, webviewStyleAtom } from "datas/style";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { BackHandler, LayoutChangeEvent, SafeAreaView } from "react-native";
import { URL } from "react-native-url-polyfill";
import { WebView, WebViewNavigation } from "react-native-webview";

interface WebviewContainerProps {
  onLayout?: (event: LayoutChangeEvent) => void;
  uri: string;
}

function WebviewContainer({ onLayout, uri }: WebviewContainerProps) {
  const webviewRef = useRef<WebView>(null);
  const [webviewNavigationState, setWebviewNavigationState] = useState<WebViewNavigation | undefined>(undefined);
  const [webviewStyle] = useAtom(webviewStyleAtom);
  const [, setTheme] = useAtom(setThemeAtom);
  const [, setIpcMessageAtom] = useAtom(IpcMessageAtom);

  useEffect(() => {
    if (webviewNavigationState?.url) {
      const url = new URL(webviewNavigationState.url);
      if (url.pathname === "/" || url.pathname === "/home" || url.pathname === "/manage") setTheme("dark");
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
        onMessage={e => onMessageHandler(e, setIpcMessageAtom)}
        allowsBackForwardNavigationGestures
        bounces={false}
      />
      {/* <NotificationContainer /> */}
      {webviewRef.current && <IpcContainer webviewRef={webviewRef} />}
    </SafeAreaView>
  );
}
export default WebviewContainer;
