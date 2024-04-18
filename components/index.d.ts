interface IpcMessage {
  type: "getFcmToken" | "getPlatform" | "postAppleLogin" | "";
  data?: any;
}
