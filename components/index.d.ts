interface IpcMessage {
  type:
    | "getFcmToken"
    | "getPlatform"
    | "getAppleIdentifyToken"
    | "accessGallery"
    | "getImageUploadResult"
    | "getLoginToken"
    | "moveToHome"
    | "";
  data?: any;
}
