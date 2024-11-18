import WebviewContainer from "@components/container/WebViewContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { storeIdAtom } from "datas/atoms";
import { useAtom } from "jotai";
import { BASE_URL } from "@env";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabNavProps } from "./BottomTabNav";
import { Alert } from "react-native";

type ManageNavProps = BottomTabScreenProps<BottomTabNavProps, "ManageNav">;

const Stack = createStackNavigator();
export default function ManageNav({ navigation, route }: ManageNavProps) {
  const { params } = route;
  const [storeId] = useAtom(storeIdAtom);

  const isFromQR = params?.storeId && params?.storeId === storeId ? true : false;
  if (params?.storeId && params?.storeId !== storeId)
    Alert.alert("근무 매장을 확인해주세요", "소속된 가게의 QR이 아니라서 출퇴근이 불가합니다.", [
      {
        text: "확인",
      },
    ]);

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
