import IpcContainer from "@components/container/IpcContainer";
import NotificationContainer from "@components/container/NotificationContainer";
import onMessageHandler from "@components/ipc/onMessageHandler";
import { getPathnameExceptStoreId } from "@utils/parsePathname";
import { isBottomTabShowScreen } from "@utils/showBottomTabScreen";
import { isTabVisibleAtom, pathnameAtom } from "datas/atoms";
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
  const [, setPathname] = useAtom(pathnameAtom);
  const [bottomTabVisibility, setTabVisibility] = useAtom(isTabVisibleAtom);

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
      setBottomTabVisibility(url.pathname);

      setPathname(url.pathname);
      if (url.pathname === "/" || url.pathname === "/home" || url.pathname === "/manage") setTheme("dark");
      else setTheme("light");
    }
  }, [webviewNavigationState]);

  const setBottomTabVisibility = (pathname: string) => {
    const pathnameExceptStoreId = getPathnameExceptStoreId(pathname);
    if (pathnameExceptStoreId.length > 0 && isBottomTabShowScreen(pathnameExceptStoreId)) setTabVisibility(true);
    else setTabVisibility(false);
  };

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
      <NotificationContainer />
      {webviewRef.current && <IpcContainer webviewRef={webviewRef} />}
    </SafeAreaView>
  );
}
export default WebviewContainer;
