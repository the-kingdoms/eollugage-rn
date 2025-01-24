interface IpcMessage {
  type:
    | "getFcmToken"
    | "getLoginToken"
    | "setLoginToken"
    | "deleteLoginToken"
    | "getPlatform"
    | "getAppleIdentifyToken"
    | "navigateToImageUploadPage"
    | "getImageUploadResult"
    | "getAppInfo"
    | "openKakaoInquire"
    | "setStatusbarStyle"
    | "setSafeAreaEdges"
    | "copyMessage"
    | "";
  data?: any;
}
