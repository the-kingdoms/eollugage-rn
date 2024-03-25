import WebView from "react-native-webview";

interface SendFcmTokenProps {
  webviewRef: React.RefObject<WebView<{}>>;
  token: string;
}

function sendFcmToken({ webviewRef, token }: SendFcmTokenProps) {
  const message: IpcMessage = { type: "getFcmTokenResponse", data: token };
  webviewRef.current?.postMessage(JSON.stringify(message));
}

export default sendFcmToken;
