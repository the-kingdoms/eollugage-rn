import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNav from "./HomeNav";
import ManageNav from "./ManageNav";
import MypageNav from "./MypageNav";
import { useAtom } from "jotai";
import { selectedTabAtom } from "datas/pathname";

const Tabs = createBottomTabNavigator();

export default function BottomTabNav() {
  const [, setSelectedTab] = useAtom(selectedTabAtom);

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS === "android" ? true : false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 88,
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 0,
            height: 1,
          },
        },
      }}
    >
      <Tabs.Screen
        name="HomeNav"
        component={HomeNav}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            setSelectedTab("home");
          },
        })}
      />
      <Tabs.Screen
        name="manageNav"
        component={ManageNav}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            setSelectedTab("manage");
          },
        })}
      />
      <Tabs.Screen
        name="myNav"
        component={MypageNav}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            setSelectedTab("mypage");
          },
        })}
      />
    </Tabs.Navigator>
  );
}
