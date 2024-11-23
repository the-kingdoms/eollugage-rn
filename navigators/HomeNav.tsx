import WebviewContainer from "@components/container/WebViewContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { storeIdAtom } from "datas/atoms";
import { useAtom } from "jotai";
import { BASE_URL } from "@env";

const Stack = createStackNavigator();

export default function HomeNav() {
  const [storeId] = useAtom(storeIdAtom);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        children={() => <WebviewContainer uri={`${BASE_URL}/${storeId}/home`} />}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
