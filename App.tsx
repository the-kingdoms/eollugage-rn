import CustomStatusBar from "@components/CustomStatusBar";
import WebviewContainer from "@components/WebViewContainer";
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
