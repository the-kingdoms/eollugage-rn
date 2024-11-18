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
    | "openKakaoInquire"
    | "";
  data?: any;
}
