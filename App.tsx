import WebviewContainer from "components/WebViewContainer";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
      <StatusBar style="dark" />
      <WebviewContainer />
      {
        //<NotificationContainer />
      }
    </Fragment>
  );
}
