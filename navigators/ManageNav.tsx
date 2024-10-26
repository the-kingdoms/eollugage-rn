import WebviewContainer from "@components/container/WebViewContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { storeIdAtom } from "datas/atoms";
import { useAtom } from "jotai";
import { BASE_URL } from "@env";

export default function ManageNav() {
  const Stack = createStackNavigator();

  const [storeId] = useAtom(storeIdAtom);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="manage"
        children={() => <WebviewContainer uri={`${BASE_URL}/${storeId}/manage`} />}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
