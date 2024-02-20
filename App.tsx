import NotificationContainer from "components/NotificationContainer";
import WebviewContainer from "components/WebViewContainer";
import { Fragment } from "react";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <Fragment>
      <StatusBar />
      <WebviewContainer />
      {
        //<NotificationContainer />
      }
    </Fragment>
  );
}
