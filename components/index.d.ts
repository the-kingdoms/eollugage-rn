interface IpcMessage {
  type:
    | "getFcmToken"
    | "getPlatform"
    | "getAppleIdentifyToken"
    | "accessGallery"
    | "getImageUploadResult"
    | "stackRouterBack"
    | "";
  data?: any;
}
