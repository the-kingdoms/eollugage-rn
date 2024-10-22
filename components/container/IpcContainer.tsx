import sendFcmToken from "@components/ipc/send/sendFcmToken";
import sendIdentifyToken from "@components/ipc/send/sendIdentifyToken";
import sendImageUploadResult from "@components/ipc/send/sendImageUploadResult";
import sendPlatform from "@components/ipc/send/sendPlatform";
import { ImageUploadResultT, uploadImage } from "@utils/accessGallery";
import appleLogin from "@utils/appleLogin";
import fcmTokenAtom from "datas/fcmtoken";
import IpcMessageAtom from "datas/message";
import { useAtom } from "jotai";
import { useEffect } from "react";
import WebView from "react-native-webview";

interface IpcContainerProps {
  webviewRef: React.RefObject<WebView<{}>>;
}

export default function IpcContainer({ webviewRef }: IpcContainerProps) {
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
      case "getAppleIdentifyToken":
        console.log("[IpcContainer] getAppleIdentifyToken called");
        appleLogin().then(data => {
          if (data) sendIdentifyToken({ webviewRef, data });
        });
        break;
      case "accessGallery":
        console.log("[IpcContainer] open gallery called");
        uploadImage(ipcMessage.data).then((result: ImageUploadResultT) => {
          console.log("upload image result:", result);
          if (result) sendImageUploadResult({ webviewRef, data: result });
        });
        break;
    }
  }, [ipcMessage]);
  return <></>;
}
