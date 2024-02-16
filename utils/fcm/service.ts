import { messageModule } from "@utils/_const";
import { OnNotification, OnOpenNotification, OnRegister } from "@utils/_type";
import { checkPermission } from "@utils/fcm/default";
import { Platform } from "react-native";

class FCMService {
  messageListener: () => void = () => {};

  register(
    onRegister: OnRegister,
    onNotification: OnNotification,
    onOpenNotification: OnOpenNotification
  ) {
    checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification
    );
  }

  async registerAppWithFCM() {
    if (Platform.OS === "ios") {
      await messageModule.setAutoInitEnabled(true);
    }
  }

  unRegister() {
    this.messageListener();
  }

  private createNotificationListeners(
    onRegister: OnRegister,
    onNotification: OnNotification,
    onOpenNotification: OnOpenNotification
  ) {
    // Background 상태에서 실행되는 경우
    messageModule.onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

    // Quit 상태에서 실행되는 경우
    messageModule
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      })
      .catch((error) => {
        console.log("quit state notification error : ", error);
      });

    // FCM 메시지 수신 시
    this.messageListener = messageModule.onMessage((remoteMessage) => {
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === "ios") {
          notification = remoteMessage?.data?.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    messageModule.onTokenRefresh((fcmToken) => {
      onRegister(fcmToken);
    });
  }
}

const fcmService = new FCMService();
export default fcmService;
