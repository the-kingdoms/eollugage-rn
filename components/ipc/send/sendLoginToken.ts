import { LoginTokenResult } from "@utils/loginToken";
import WebView from "react-native-webview";

interface SendLoginTokenProps {
  webviewRef: React.RefObject<WebView<{}>>;
  data: LoginTokenResult;
}

function sendLoginToken({ webviewRef, data }: SendLoginTokenProps) {
  const message: IpcMessage = { type: "getLoginToken", data };
  webviewRef.current?.postMessage(JSON.stringify(message));
}

export default sendLoginToken;
