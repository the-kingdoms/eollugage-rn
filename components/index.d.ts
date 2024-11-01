interface IpcMessage {
  type:
    | "getFcmToken"
    | "getLoginToken"
    | "setLoginToken"
    | "deleteLoginToken"
    | "getPlatform"
    | "getAppleIdentifyToken"
    | "accessGallery"
    | "";
  data?: any;
}
