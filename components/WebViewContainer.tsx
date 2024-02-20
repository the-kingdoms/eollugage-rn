import { useRef } from "react";
import { Dimensions, StyleSheet, SafeAreaView } from "react-native";
import { WebView, WebViewProps } from "react-native-webview";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

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

function WebviewContainer() {
  const webviewRef = useRef<WebView>(null);
  const uri = "172.30.1.40:3000";

  const sendMessage = (message: string) => {
    webviewRef.current?.postMessage(message);
  };

  const onMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data);
  };
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        ref={webviewRef}
        onMessage={onMessage}
        source={{ uri }}
      />
    </SafeAreaView>
  );
}
export default WebviewContainer;
