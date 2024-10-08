import styled from "styled-components/native";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TempPage from "./Temp";
import HomeNav from "./HomeNav";
import ManageNav from "./ManageNav";
import MypageNav from "./MypageNav";

const Tabs = createBottomTabNavigator();

export default function BottomTabNav() {
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
      <Tabs.Screen name="HomeNav" component={HomeNav} />
      <Tabs.Screen name="manageNav" component={ManageNav} />
      <Tabs.Screen name="myNav" component={MypageNav} />
    </Tabs.Navigator>
  );
}
