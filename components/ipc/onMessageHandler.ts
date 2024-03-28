import { WebViewMessageEvent } from "react-native-webview";

export default function onMessageHandler(e: WebViewMessageEvent, setData: (data: IpcMessage) => void) {
  const data: IpcMessage = JSON.parse(e.nativeEvent.data);
  console.log("[onMessageHandler] data :", data);
  setData(data);
}
