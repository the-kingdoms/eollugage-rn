import WebviewContainer from "@components/container/WebViewContainer";
import { createStackNavigator } from "@react-navigation/stack";

export default function MypageNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        children={() => <WebviewContainer uri="http://localhost:3000/mypage" />}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
