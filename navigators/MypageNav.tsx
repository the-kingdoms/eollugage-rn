import WebviewContainer from "@components/container/WebViewContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { storeIdAtom } from "datas/atoms";
import { useAtom } from "jotai";
import { BASE_URL } from "@env";
import AppInfoPage from "pages/AppInfo";
import styled from "styled-components/native";
import CloseIcon from "../assets/image/close.svg";

export type MyPageNavProps = {
  Mypage: undefined;
  Info: undefined;
};

const Stack = createStackNavigator<MyPageNavProps>();

export default function MypageNav() {
  const [storeId] = useAtom(storeIdAtom);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mypage"
        children={() => <WebviewContainer uri={`${BASE_URL}/${storeId}/mypage`} />}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Info"
        component={AppInfoPage}
        options={({ navigation }) => ({
          header: () => (
            <InfoHeaderContainer>
              <InfoHeaderLeft onPress={() => navigation.goBack()}>
                <CloseIcon width={20} height={20} color="#262626" />
              </InfoHeaderLeft>
              <InfoHeaderText allowFontScaling={false}>앱 버전</InfoHeaderText>
            </InfoHeaderContainer>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const InfoHeaderContainer = styled.View`
  padding: 14px 6px;
  background-color: white;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InfoHeaderLeft = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 14px;
  top: 6px;
`;

const InfoHeaderText = styled.Text`
  font-family: Medium;
  font-size: 16px;
  color: #161616;
  position: absolute;
`;
