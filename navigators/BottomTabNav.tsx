import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNav from "./HomeNav";
import ManageNav from "./ManageNav";
import MypageNav from "./MypageNav";
import { useAtom } from "jotai";
import { isTabVisibleAtom } from "datas/atoms";

const Tabs = createBottomTabNavigator();

export default function BottomTabNav() {
  const [isTabVisible] = useAtom(isTabVisibleAtom);
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS === "android" ? true : false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: isTabVisible ? "flex" : "none",
          height: 88,
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 0,
            height: 1,
          },
        },
      }}
    >
      <Tabs.Screen name="HomeNav" component={HomeNav} />
      <Tabs.Screen name="ManageNav" component={ManageNav} />
      <Tabs.Screen name="MyNav" component={MypageNav} />
    </Tabs.Navigator>
  );
}
