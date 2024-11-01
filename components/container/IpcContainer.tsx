import sendFcmToken from "@components/ipc/send/sendFcmToken";
import sendIdentifyToken from "@components/ipc/send/sendIdentifyToken";
import sendImageUploadResult from "@components/ipc/send/sendImageUploadResult";
import sendLoginToken from "@components/ipc/send/sendLoginToken";
import sendPlatform from "@components/ipc/send/sendPlatform";
import { ImageUploadResultT, uploadImage } from "@utils/accessGallery";
import appleLogin from "@utils/appleLogin";
import {
  LoginTokenResult,
  deleteLoginTokenFromStore,
  getLoginTokenFromStore,
  setLoginTokenFromStore,
} from "@utils/loginToken";
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
          console.log("[IpcContainer] upload image result:", result);
          if (result) sendImageUploadResult({ webviewRef, data: result });
        });
        break;
      case "getLoginToken":
        console.log("[IpcContainer] getLoginToken called");
        getLoginTokenFromStore("access_token").then((result: LoginTokenResult) => {
          console.log("[IpcContainer] getLoginToken result:", result);
          if (result) sendLoginToken({ webviewRef, data: result });
        });
        break;
      case "setLoginToken":
        console.log("[IpcContainer] setLoginToken called");
        setLoginTokenFromStore("access_token", ipcMessage.data).then(() => {
          console.log("successfully set access_token:", ipcMessage.data);
        });
        break;
      case "deleteLoginToken":
        console.log("[IpcContainer] deleteLoginToken called");
        deleteLoginTokenFromStore("access_token").then(() => {
          console.log("successfully delete access_token:");
        });
    }
  }, [ipcMessage]);
  return <></>;
}
