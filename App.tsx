import CustomStatusBar from "@components/CustomStatusBar";
import WebviewContainer from "@components/container/WebViewContainer";
import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
      <CustomStatusBar />
      <WebviewContainer />
    </Fragment>
  );
}
