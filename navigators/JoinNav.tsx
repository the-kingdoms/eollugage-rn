import WebviewContainer from "@components/container/WebViewContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { BASE_URL } from "@env";
import ImageUploadPage from "pages/ImageUploadPage";

export type JoinNavProps = {
  join: undefined;
  imageUpload: {
    storeId: string;
    from: "home" | "join";
  };
};

const Stack = createStackNavigator<JoinNavProps>();

export default function JoinNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="join" children={() => <WebviewContainer uri={BASE_URL} />} />
      <Stack.Screen name="imageUpload" component={ImageUploadPage} />
    </Stack.Navigator>
  );
}
