import WebView from "react-native-webview";

export default function JoinWebViewContainer() {
  return <WebView source={{ uri: "http://localhost:3000" }} />;
}
