import WebView from "react-native-webview";
import { Platform } from "react-native";

interface SendPlatformProps {
  webviewRef: React.RefObject<WebView<{}>>;
}

function sendPlatform({ webviewRef }: SendPlatformProps) {
  const message: IpcMessage = { type: "getPlatform", data: Platform };
  webviewRef.current?.postMessage(JSON.stringify(message));
}

export default sendPlatform;
