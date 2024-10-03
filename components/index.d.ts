interface IpcMessage {
  type: "getFcmToken" | "getPlatform" | "getAppleIdentifyToken" | "accessGallery" | "getImageUploadResult" | "";
  data?: any;
}
