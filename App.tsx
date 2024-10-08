import CustomStatusBar from "@components/CustomStatusBar";
import WebviewContainer from "@components/container/WebViewContainer";
import { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppBase from "navigators/AppBase";

if (__DEV__) {
  require("./ReactotronConfig");
}

export default function App() {
  return (
    <Fragment>
      <CustomStatusBar />
      <NavigationContainer>
        <AppBase />
      </NavigationContainer>
      {/* <WebviewContainer /> */}
    </Fragment>
  );
}
