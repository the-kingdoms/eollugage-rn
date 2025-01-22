import { GestureResponderEvent, Platform, TouchableOpacity } from "react-native";
import { BottomTabBarButtonProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNav from "./HomeNav";
import ManageNav from "./ManageNav";
import MypageNav from "./MypageNav";
import { useAtom } from "jotai";
import { isTabVisibleAtom, statusbarAtom } from "datas/atoms";
import HomeIcon from "../assets/image/home.svg";
import ManageIcon from "../assets/image/people.svg";
import MypageIcon from "../assets/image/person-outlined.svg";
import styled from "styled-components/native";
import { StatusBarStyle } from "expo-status-bar";

export type BottomTabNavProps = {
  HomeNav: undefined;
  ManageNav: {
    storeId?: string;
  };
  MypageNav: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabNavProps>();

export default function BottomTabNav() {
  const [isTabVisible] = useAtom(isTabVisibleAtom);
  const [, setStatusbarStyle] = useAtom(statusbarAtom);

  const onPressTab = (
    props: BottomTabBarButtonProps,
    event: GestureResponderEvent,
    color: string,
    style: StatusBarStyle,
  ) => {
    setStatusbarStyle({ color, style });
    props.onPress?.(event);
  };

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
      <Tabs.Screen
        name="HomeNav"
        component={HomeNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabWrapper>
              <HomeIcon width={24} height={24} color={focused ? "#262626" : "#6F6F6F"} />
              <TabText style={{ color: focused ? "#161616" : "#6F6F6F" }}>홈</TabText>
            </TabWrapper>
          ),
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={event => onPressTab(props, event, "#000", "light")} />
          ),
        }}
      />
      <Tabs.Screen
        name="ManageNav"
        component={ManageNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabWrapper>
              <ManageIcon width={24} height={24} color={focused ? "#262626" : "#6F6F6F"} />
              <TabText style={{ color: focused ? "#161616" : "#6F6F6F" }}>근무 관리</TabText>
            </TabWrapper>
          ),
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={event => onPressTab(props, event, "#131313", "light")} />
          ),
        }}
      />
      <Tabs.Screen
        name="MypageNav"
        component={MypageNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabWrapper>
              <MypageIcon width={24} height={24} color={focused ? "#262626" : "#6F6F6F"} />
              <TabText style={{ color: focused ? "#161616" : "#6F6F6F" }}>마이</TabText>
            </TabWrapper>
          ),
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={event => onPressTab(props, event, "#FFF", "dark")} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const TabWrapper = styled.View`
  display: flex;
  gap: 4px;
  align-items: center;
  padding-top: 10px;
`;
const TabText = styled.Text`
  font-size: 12px;
  font-family: Medium;
`;
