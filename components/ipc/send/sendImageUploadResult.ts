import { ImageUploadResultT } from "@components/lib/accessGallery";
import WebView from "react-native-webview";

interface SendImageUploadResultProps {
  webviewRef: React.RefObject<WebView<{}>>;
  data: ImageUploadResultT;
}

function sendImageUploadResult({ webviewRef, data }: SendImageUploadResultProps) {
  const message: IpcMessage = { type: "getImageUploadResult", data };
  webviewRef.current?.postMessage(JSON.stringify(message));
}

export default sendImageUploadResult;
