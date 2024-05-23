import WebView from "react-native-webview";

interface SendIdentifyTokenProps {
  webviewRef: React.RefObject<WebView<{}>>;
  token: string;
}

function sendIdentifyToken({ webviewRef, token }: SendIdentifyTokenProps) {
  const message: IpcMessage = { type: "getAppleIdentifyToken", data: token };
  webviewRef.current?.postMessage(JSON.stringify(message));
}

export default sendIdentifyToken;
