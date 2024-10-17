interface IpcMessage {
  type: "getFcmToken" | "getPlatform" | "getAppleIdentifyToken" | "accessGallery" | "getImageUploadResult" | "";
  type:
    | "getFcmToken"
    | "getPlatform"
    | "getAppleIdentifyToken"
    | "accessGallery"
    | "getImageUploadResult"
    | "getLoginToken"
    | "";
  data?: any;
}
