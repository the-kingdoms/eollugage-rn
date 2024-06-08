import { messageModule } from "@utils/_const";
import { OnRegister } from "@utils/_type";

async function checkPermission(onRegister: OnRegister) {
  try {
    const enabled = await messageModule.hasPermission();
    if (enabled) {
      getToken(onRegister);
    } else {
      requestPermission(onRegister);
    }
  } catch (error) {
    console.log("[FCMService] Permission rejected ", error);
  }
}

async function getToken(onRegister: OnRegister) {
  try {
    const fcmToken = await messageModule.getToken();
    if (fcmToken) {
      onRegister(fcmToken);
    } else {
      console.log("[FCMService] User does not have a device token");
    }
  } catch (error) {
    console.log("[FCMService] getToken rejected", error);
  }
}

async function requestPermission(onRegister: OnRegister) {
  try {
    await messageModule.requestPermission();
    getToken(onRegister);
  } catch (error) {
    console.log("[FCMService] Request Permission rejected", error);
  }
}

export { checkPermission, getToken, requestPermission };
