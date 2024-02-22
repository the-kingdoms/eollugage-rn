import CustomStatusBar from "@components/CustomStatusBar";
import WebviewContainer from "@components/webview/WebViewContainer";
import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
      <CustomStatusBar />
      <WebviewContainer />
      {
        //<NotificationContainer />
      }
    </Fragment>
  );
}
