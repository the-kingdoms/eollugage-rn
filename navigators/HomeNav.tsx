import WebviewContainer from "@components/container/WebViewContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { storeIdAtom } from "datas/atoms";
import { useAtom } from "jotai";

export default function HomeNav() {
  const Stack = createStackNavigator();
  const [storeId] = useAtom(storeIdAtom);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        children={() => <WebviewContainer uri={`http://localhost:3000/${storeId}/home`} />}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
