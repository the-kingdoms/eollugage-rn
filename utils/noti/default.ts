import { PushNotificationObject } from "react-native-push-notification";

function buildAndroidNotification(notify: PushNotificationObject) {
  return {
    id: notify.id,
    largeIcon: notify.largeIcon || "ic_launcher",
    smallIcon: notify.smallIcon || "ic_notification",
    bigText: notify.message || "",
    subText: notify.title || "",
    vibrate: notify.vibrate || true,
    vibration: notify.vibration || 300,
    priority: notify.priority || "high",
    importance: notify.importance || "high",
  };
}

function buildIOSNotification(notify: PushNotificationObject) {
  return {
    category: notify.category || "",
    userInfo: {
      id: notify.id,
      item: notify,
    },
  };
}

export { buildAndroidNotification, buildIOSNotification };
