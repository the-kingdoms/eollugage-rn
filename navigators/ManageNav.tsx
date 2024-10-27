import WebviewContainer from "@components/container/WebViewContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { storeIdAtom } from "datas/atoms";
import { useAtom } from "jotai";
import { BASE_URL } from "@env";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabNavProps } from "./BottomTabNav";

type ManageNavProps = BottomTabScreenProps<BottomTabNavProps, "ManageNav">;

const Stack = createStackNavigator();
export default function ManageNav({ navigation, route }: ManageNavProps) {
  const isFromQR = route.params.storeId ? true : false;
  const [storeId] = useAtom(storeIdAtom);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="manage"
        children={() => (
          <WebviewContainer
            uri={isFromQR ? `${BASE_URL}/${storeId}/manage?qr=true` : `${BASE_URL}/${storeId}/manage`}
          />
        )}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
