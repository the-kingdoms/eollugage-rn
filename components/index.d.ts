interface IpcMessage {
  type: "getFcmToken" | "getPlatform" | "getAppleIdentifyToken" | "accessGallery" | "";
  data?: any;
}
