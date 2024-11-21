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
    | "setStatusbarStyle"
    | "";
  data?: any;
}
