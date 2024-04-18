import sendFcmToken from "@components/ipc/send/sendFcmToken";
import sendPlatform from "@components/ipc/send/sendPlatform";
import appleLogin from "@components/lib/appleLogin";
import fcmTokenAtom from "datas/fcmtoken";
import IpcMessageAtom from "datas/message";
import { useAtom } from "jotai";
import { useEffect } from "react";
import WebView from "react-native-webview";

export default function IpcContainer({ webviewRef }: { webviewRef: React.RefObject<WebView<{}>> }) {
  const [ipcMessage] = useAtom(IpcMessageAtom);
  const [fcmToken] = useAtom(fcmTokenAtom);
  useEffect(() => {
    switch (ipcMessage.type) {
      case "getFcmToken":
        console.log("[IpcContainer] getFcmToken called");
        console.log("[IpcContainer] fcmToken :", fcmToken);
        if (fcmToken) sendFcmToken({ webviewRef, token: fcmToken });
        break;
      case "getPlatform":
        console.log("[IpcContainer] getPlatform called");
        sendPlatform({ webviewRef });
        break;
      case "postAppleLogin":
        console.log("[IpcContainer] postAppleLogin called");
        appleLogin();
        break;
    }
  }, [ipcMessage]);
  return <></>;
}
