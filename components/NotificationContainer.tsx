import fcmService from "@utils/fcm/service";
import localNotificationService from "@utils/noti/service";
import { useEffect } from "react";
import WebView from "react-native-webview";

function NotificationContainer({ webviewRef }: { webviewRef: React.RefObject<WebView<{}>> }) {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  }, []);

  const onRegister = (tk: string) => {
    console.log("[App] onRegister : token :", tk);
    if (tk) {
      const message = { type: "fcmtoken", token: tk };
      webviewRef.current?.postMessage(JSON.stringify(message));
    }
  };

  const onNotification = (notify: any) => {
    console.log("[App] onNotification : notify :", notify);
    const options = {
      soundName: "default",
      playSound: true,
    };
    localNotificationService.showNotification({
      ...notify,
      ...options,
    });
  };

  const onOpenNotification = (notify: any) => {
    console.log("[App] onOpenNotification : notify :", notify);
  };
  return <></>;
}

export default NotificationContainer;
