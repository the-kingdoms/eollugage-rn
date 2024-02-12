import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import WebView from "react-native-webview";
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "./utils/notification";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token ?? "")
    );
  }, []);
  return (
    <Fragment>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.webview}
          source={{ uri: "https://gage.eolluga.com" }}
        />
        <Button
          title="a"
          onPress={async () => await sendPushNotification(expoPushToken)}
        />
      </SafeAreaView>
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
