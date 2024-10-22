import WebviewContainer from "@components/container/WebViewContainer";
import { BASE_URL } from "@env";

export default function JoinWebViewContainer() {
  return <WebviewContainer uri={BASE_URL} />;
}
