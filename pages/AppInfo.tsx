import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { MyPageNavProps } from "navigators/MypageNav";
import { Image, Platform, Alert, Linking } from "react-native";
import styled from "styled-components/native";
import { version } from "../package.json";
import { getAppVersion } from "@utils/getAppVersion";
import { useEffect, useState } from "react";

type AppInfoPageProps = StackScreenProps<MyPageNavProps, "Info">;

export default function AppInfoPage({ navigation }: AppInfoPageProps) {
  const [link, setLink] = useState<string>("");
  const [needUpdate, setNeedUpdate] = useState<boolean>(false);

  useEffect(() => {
    getAppVersion().then(response => {
      if (response.isSuccess) {
        setLink(response.url);
      }
    });
  }, []);

  const onPressTitle = () => {
    if (link.length > 0) Linking.openURL(link);
    else Alert.alert("다시 시도해주세요.");
  };

  return (
    <Container>
      <ImageContainer style={ImageShadow}>
        <AppIcon source={require("../assets/image/logo.png")} />
      </ImageContainer>
      {needUpdate ? (
        <Title onPress={onPressTitle} style={{ textDecorationLine: "underline" }} allowFontScaling={false}>
          업데이트가 필요합니다
        </Title>
      ) : (
        <Title allowFontScaling={false}>최신 버전입니다</Title>
      )}
      <VersionText allowFontScaling={false}>현재 버전 {version}</VersionText>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  padding-top: 180px;
`;
const ImageContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: visible;
  background-color: white;
`;
const AppIcon = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 12px;
`;
const Title = styled.Text`
  color: #161616;
  font-family: Medium;
  font-size: 16px;
  margin-bottom: 8px;
`;
const VersionText = styled.Text`
  color: #6f6f6f;
  font-family: Regular;
  font-size: 12px;
`;

const ImageShadow =
  Platform.OS === "ios"
    ? {
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
      }
    : { elevation: 6 };
