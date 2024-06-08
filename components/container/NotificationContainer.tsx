import fcmService from "@utils/fcm/service";
import localNotificationService from "@utils/noti/service";
import fcmTokenAtom from "datas/fcmtoken";
import { useAtom } from "jotai";
import { useEffect } from "react";

function NotificationContainer() {
  const [, setFcmToken] = useAtom(fcmTokenAtom);

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  }, []);

  const onRegister = (tk: string) => {
    console.log("[NotificationContainer] onRegister : token :", tk);
    if (tk) {
      setFcmToken(tk);
    }
  };

  const onNotification = (notify: any) => {
    console.log("[NotificationContainer] onNotification : notify :", notify);
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
    console.log("[NotificationContainer] onOpenNotification : notify :", notify);
  };
  return <></>;
}

export default NotificationContainer;
