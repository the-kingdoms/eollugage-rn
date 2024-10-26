import WebviewContainer from "@components/container/WebViewContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { storeIdAtom } from "datas/atoms";
import { useAtom } from "jotai";
import { BASE_URL } from "@env";

export default function MypageNav() {
  const Stack = createStackNavigator();

  const [storeId] = useAtom(storeIdAtom);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        children={() => <WebviewContainer uri={`${BASE_URL}/${storeId}/mypage`} />}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
