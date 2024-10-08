import WebviewContainer from "@components/container/WebViewContainer";
import { createStackNavigator } from "@react-navigation/stack";

export default function ManageNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        children={() => <WebviewContainer uri="http://localhost:3000/manage" />}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
