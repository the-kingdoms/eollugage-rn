import { Dimensions, GestureResponderEvent, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";

interface PopupModalProps {
  hideModal: () => void;
  onPressGrayButton: () => void;
  onPressBlackButton: () => void;
}

export default function PopupModal({ hideModal, onPressGrayButton, onPressBlackButton }: PopupModalProps) {
  const onPressBackdrop = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) hideModal();
  };

  return (
    <TouchableWithoutFeedback onPress={onPressBackdrop}>
      <Container>
        <Background>
          <Title>가게를 이대로 완성하실 건가요?</Title>
          <View>
            <Description>가게 사진을 추가했을 때 손님들이 더 좋아해요.</Description>
            <Description>이대로 가게를 완성하실 건가요?</Description>
          </View>
          <ButtonContainer>
            <GrayButton onPress={onPressGrayButton}>
              <GrayButtonText>사진 추가하기</GrayButtonText>
            </GrayButton>
            <BlackButton onPress={onPressBlackButton}>
              <BlackButtonText>이대로 완성하기</BlackButtonText>
            </BlackButton>
          </ButtonContainer>
        </Background>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(22, 22, 22, 0.5);
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const screenWidth = Dimensions.get("window").width;
const Background = styled.View`
  position: relative;
  background-color: white;
  width: ${screenWidth - 48}px;
  border-radius: 12px;
  padding: 28px 20px;
`;

const Title = styled.Text`
  color: #161616;
  font-size: 20px;
  font-weight: 600;
  font-family: Bold;
  line-height: 20px;
  letter-spacing: -0.5px;
  margin-bottom: 16px;
`;

const Description = styled.Text`
  color: #161616;
  font-size: 14px;
  font-weight: 400;
  font-family: Regular;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  margin-top: 24px;
`;

const BlackButton = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 12px 0;
  background-color: #131313;
  flex: 1;
`;

const BlackButtonText = styled.Text`
  color: white;
  font-family: Bold;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.5px;
  align-self: center;
`;

const GrayButton = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 12px 0;
  background-color: #e0e0e0;
  flex: 1;
`;

const GrayButtonText = styled.Text`
  color: #6f6f6f;
  font-family: Bold;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.5px;
  align-self: center;
`;
