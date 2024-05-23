interface IpcMessage {
  type: "getFcmToken" | "getPlatform" | "getAppleIdentifyToken" | "";
  data?: any;
}
