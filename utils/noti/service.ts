import { OnOpenNotification } from "@utils/_type";
import {
  buildAndroidNotification,
  buildIOSNotification,
} from "@utils/noti/default";
import { Platform } from "react-native";
import PushNotification, {
  PushNotificationObject,
} from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

class LocalNotificationService {
  configure(onOpenNotification: OnOpenNotification) {
    PushNotification.configure({
      onRegister: function (token) {
        console.log(
          "[LocalNotificationService] onRegister : localtoken",
          token
        );
      },
      onNotification: function (notification) {
        console.log("[LocalNotificationService] onNotification ", notification);
        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotification(
          Platform.OS === "ios" ? notification.data.item : notification.data
        );
        if (Platform.OS === "ios") {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  unRegister() {
    PushNotification.unregister();
  }

  showNotification(notify: PushNotificationObject) {
    const noti: PushNotificationObject = {
      // Android only Properties
      ...buildAndroidNotification(notify),
      // IOS and Android properties
      ...buildIOSNotification(notify),
      // IOS and Android properties
      id: notify.id || 0,
      title: notify.title || "",
      message: notify.message || "",
      playSound: notify.playSound || false,
      soundName: notify.soundName || "default",
    };
    PushNotification.localNotification(noti);
  }
}

const localNotificationService = new LocalNotificationService();
export default localNotificationService;
