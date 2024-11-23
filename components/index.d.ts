interface IpcMessage {
  type:
    | "getFcmToken"
    | "getLoginToken"
    | "setLoginToken"
    | "deleteLoginToken"
    | "getPlatform"
    | "getAppleIdentifyToken"
    | "accessGallery"
    | "getImageUploadResult"
    | "getAppInfo"
    | "openKakaoInquire"
    | "";
  data?: any;
}
