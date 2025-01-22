import IpcContainer from "@components/container/IpcContainer";
import NotificationContainer from "@components/container/NotificationContainer";
import onMessageHandler from "@components/ipc/onMessageHandler";
import { getPathnameExceptStoreId } from "@utils/parsePathname";
import { isBottomTabShowScreen } from "@utils/showBottomTabScreen";
import { isTabVisibleAtom, pathnameAtom } from "datas/atoms";
import IpcMessageAtom from "datas/message";
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
    }
  }, [webviewNavigationState]);

  const setBottomTabVisibility = (pathname: string) => {
    const pathnameExceptStoreId = getPathnameExceptStoreId(pathname);
    if (pathnameExceptStoreId.length > 0 && isBottomTabShowScreen(pathnameExceptStoreId)) setTabVisibility(true);
    else setTabVisibility(false);
  };

  return (
    <SafeAreaView onLayout={onLayout} style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        style={{ flex: 1 }}
        onNavigationStateChange={setWebviewNavigationState}
        source={{ uri }}
        onMessage={e => onMessageHandler(e, setIpcMessageAtom)}
        allowsBackForwardNavigationGestures
        bounces={false}
        cacheEnabled
        webviewDebuggingEnabled
        startInLoadingState
      />
      <NotificationContainer />
      {webviewRef.current && <IpcContainer webviewRef={webviewRef} />}
    </SafeAreaView>
  );
}
export default WebviewContainer;
