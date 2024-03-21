import { useEffect } from "react";
import WebView from "react-native-webview";

export default function SendTest({ webviewRef }: { webviewRef: React.RefObject<WebView<{}>> }) {
  let time = 0;
  const sendTest = () => {
    const message = `sendTest ${time++}`;
    console.log(message);
    webviewRef.current?.postMessage(message);
  };
  useEffect(() => {
    if (webviewRef.current) {
      setInterval(sendTest, 1000);
    }
  }, [webviewRef.current]);
  return <></>;
}
