import fcmService from "@utils/fcm/service";
import localNotificationService from "@utils/noti/service";
import { useEffect } from "react";

function NotificationContainer() {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  }, []);

  const onRegister = (tk: string) => {
    console.log("[App] onRegister : token :", tk);
    if (tk) {
      // send token to web view
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
