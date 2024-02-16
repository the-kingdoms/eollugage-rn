import { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import WebView from "react-native-webview";
import fcmService from "./utils/fcm/service";
import localNotificationService from "./utils/noti/service";
import Clipboard from "@react-native-clipboard/clipboard";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  }, []);

  const onRegister = (tk: string) => {
    console.log("[App] onRegister : token :", tk);
    if (tk) setToken(tk);
  };

  const onNotification = (notify: any) => {
    console.log("[App] onNotification : notify :", notify);
    const options = {
      soundName: "default",
      playSound: true,
    };
    localNotificationService.showNotification({
      ...notify,
      ...options,
    });
  };

  const onOpenNotification = (notify: any) => {
    console.log("[App] onOpenNotification : notify :", notify);
  };

  const onCopy = () => {
    Clipboard.setString(token);
  };
  return (
    <Fragment>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.webview}
          source={{ uri: "https://gage.eolluga.com" }}
        />
      </SafeAreaView>
      <TouchableOpacity onPress={onCopy}>
        <Text>{token || "unknown token"}</Text>
      </TouchableOpacity>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    color: "black",
  },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});
