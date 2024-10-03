import WebView from "react-native-webview";

interface SendIdentifyTokenProps {
  webviewRef: React.RefObject<WebView<{}>>;
  data: { token: string; firstName: string; lastName: string };
}

function sendIdentifyToken({ webviewRef, data }: SendIdentifyTokenProps) {
  const message: IpcMessage = { type: "getAppleIdentifyToken", data };
  webviewRef.current?.postMessage(JSON.stringify(message));
}

export default sendIdentifyToken;
