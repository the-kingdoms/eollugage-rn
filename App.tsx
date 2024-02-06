import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { StatusBar } from "react-native";
import { Fragment } from "react";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default function App() {
  return (
    <Fragment>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.webview}
          source={{ uri: "https://gage.eolluga.com" }}
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
