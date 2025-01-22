import { ActivityIndicator, Dimensions, Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import LeftArrowIcon from "../assets/image/chevron-left-outlined.svg";
import InfoIcon from "../assets/image/info-circle-filled.svg";
import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { openGallery, patchStoreImageInfo, uploadImage } from "@utils/accessGallery";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HomeNavProps } from "navigators/HomeNav";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { useAtom } from "jotai";
import { isLoggedInAtom, isTabVisibleAtom, safeAreaAtom, statusbarAtom, storeIdAtom } from "datas/atoms";
import PopupModal from "@components/PopupModal";
import { JoinNavProps } from "navigators/JoinNav";

type ImageUploadPageProps =
  | StackScreenProps<HomeNavProps, "imageUpload">
  | StackScreenProps<JoinNavProps, "imageUpload">;

export default function ImageUploadPage({ route }: ImageUploadPageProps) {
  const storeId = route.params.storeId;
  const from = route.params.from;

  const [, setSafeArea] = useAtom(safeAreaAtom);
  const [, setIsTabVisible] = useAtom(isTabVisibleAtom);
  const [, setStatusbarStyle] = useAtom(statusbarAtom);
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setStoreId] = useAtom(storeIdAtom);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"alert" | "error">("alert");
  const [storeImage, setStoreImage] = useState<null | ImagePicker.ImagePickerAsset>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const homeNavigation = useNavigation<StackNavigationProp<HomeNavProps>>();
  const joinNavigation = useNavigation<StackNavigationProp<JoinNavProps>>();

  const imageWidth = Dimensions.get("window").width - 32;
  const imageHeight = imageWidth * 0.66;

  const onPressBackButton = () => {
    if (from === "home") homeNavigation.goBack();
    else joinNavigation.goBack();
  };

  const onPressSelectButton = async () => {
    const result = await openGallery();
    if (!result.canceled) setStoreImage(result.assets[0]);
  };

  const onPressLeaveButton = async () => {
    if (storeImage !== null) {
      setIsLoading(true);
      const uploadFileResult = await uploadImage(storeId, storeImage);
      if (uploadFileResult.isSuccess && uploadFileResult.fileName) {
        const uploadInfoResult = await patchStoreImageInfo(uploadFileResult.fileName, storeId);

        // 둘 다 성공
        if (uploadInfoResult) {
          setIsLoading(false);
          if (from === "home") homeNavigation.goBack();
          else {
            setIsLoggedIn(true);
            setStoreId(storeId);
          }
        } else handlerError(); // 가게 이미지 정보 업로드 오류
      } else handlerError(); // S3 업로드 오류
    }
  };

  const handlerError = () => {
    setIsLoading(false);
    setModalType("error");
    setShowModal(true);
  };

  const onPressModalGrayButton = () => {
    setShowModal(false);
  };

  const onPressModalBlackButton = () => {
    setShowModal(false);
    if (modalType === "error") onPressLeaveButton();
    else {
      if (from === "home") homeNavigation.goBack();
      else {
        setIsLoggedIn(true);
        setStoreId(storeId);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      setSafeArea(["bottom"]);
      setIsTabVisible(false);
      setStatusbarStyle({ color: "#FFF", style: "dark" });

      return () => {
        setStatusbarStyle({ color: "#000", style: "light" });
        setIsTabVisible(true);
        setSafeArea([]);
      };
    }, []),
  );

  return (
    <Container>
      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
        <Header>
          <BackButton onPress={onPressBackButton}>
            <LeftArrowIcon />
          </BackButton>
          {from === "home" && <HeaderText>가게 대표 사진 추가</HeaderText>}
        </Header>
        {from === "join" && (
          <TitleContainer>
            <Title allowFontScaling={false}>가게 메뉴판에 사용할</Title>
            <Title allowFontScaling={false}>대표 이미지를 추가해주세요</Title>
          </TitleContainer>
        )}

        <Image
          style={{ width: imageWidth, height: imageHeight }}
          source={storeImage === null ? require("../assets/image/default-store-image.png") : { uri: storeImage.uri }}
        />

        <DescriptionContainer>
          <InfoIcon />
          <View>
            <Description allowFontScaling={false}>예시처럼 매장의 전체 공간이 보이는 사진을 선택해주세요.</Description>
            <Description allowFontScaling={false}>
              손님들이 있는 사진보다 손님들이 없는 사진을 선택해주세요.
            </Description>
          </View>
        </DescriptionContainer>
      </View>
      {storeImage === null ? (
        <ButtonContainer>
          <SelectButton onPress={onPressSelectButton}>
            <SelectText allowFontScaling={false}>앨범에서 선택하기</SelectText>
          </SelectButton>
          <TouchableOpacity>
            <SkipText allowFontScaling={false} onPress={() => setShowModal(true)}>
              나중에 추가하기
            </SkipText>
          </TouchableOpacity>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <SelectButton onPress={onPressLeaveButton}>
            {isLoading ? (
              <ActivityIndicator size={"small"} />
            ) : (
              <SelectText allowFontScaling={false}>가게 완성하기</SelectText>
            )}
          </SelectButton>
          <TouchableOpacity onPress={onPressSelectButton}>
            <SkipText allowFontScaling={false}>사진 바꾸기</SkipText>
          </TouchableOpacity>
        </ButtonContainer>
      )}
      {showModal && (
        <PopupModal
          type={modalType}
          onPressBlackButton={onPressModalBlackButton}
          onPressGrayButton={onPressModalGrayButton}
          hideModal={() => setShowModal(false)}
        />
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: space-between;
`;

const Header = styled.View`
  padding: 8px -2px;
  margin-bottom: 24px;
  position: relative;
  min-height: 32px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 2px;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  font-family: Medium;
  font-weight: 500;
  color: #161616;
  line-height: 20px;
  letter-spacing: -0.5px;
  align-self: center;
`;

const TitleContainer = styled.View`
  margin-bottom: 48px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  font-family: SCDream;
  line-height: 26px;
  letter-spacing: -0.5px;
  color: #161616;
`;

const DescriptionContainer = styled.View`
  margin-top: 12px;
  flex-direction: row;
  gap: 16px;
`;

const Description = styled.Text`
  font-family: Medium;
  font-size: 12px;
  font-weight: 500;
  color: #6f6f6f;
  line-height: 18px;
  letter-spacing: -0.25px;
`;

const ButtonContainer = styled.View`
  gap: 8px;
  align-items: center;
  padding: 0 16px;
`;

const SelectButton = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: #131313;
  padding: 22px 0;
  width: 100%;
`;

const SelectText = styled.Text`
  color: white;
  font-size: 16px;
  font-family: Bold;
  line-height: 20px;
  letter-spacing: -0.5px;
  align-self: center;
`;

const SkipText = styled.Text`
  color: rgba(22, 22, 22, 0.25);
  font-family: Bold;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.5px;
  padding: 12px 0;
`;
