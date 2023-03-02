import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIcon, setEmailIcon] = useState(
    require("../assets/icon-email.png")
  );
  const [passwordIcon, setPasswordIcon] = useState(
    require("../assets/icon-password.png")
  );

  const handleLogin = () => {
    console.log(email, password);
  };

  const focusEmail = () => {
    setEmailIcon(require("../assets/icon-email-animated.gif"));
    setPasswordIcon(require("../assets/icon-password.png"));
  };

  const focusPassword = () => {
    setPasswordIcon(require("../assets/icon-password-animated.gif"));
    setEmailIcon(require("../assets/icon-email.png"));
  };

  const onBackgroundTap = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={onBackgroundTap}>
        <BlurView
          tint="default"
          intensity={100}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </TouchableWithoutFeedback>
      <Modal>
        <Logo source={require("../assets/icon.png")} />
        <Text>Start Learning. Access Pro Content.</Text>
        <TextInput
          onChangeText={(email) => setEmail(email)}
          placeholder={"Email"}
          keyboardType="email-address"
          onFocus={focusEmail}
        />
        <TextInput
          onChangeText={(password) => setPassword(password)}
          placeholder={"Password"}
          secureTextEntry={true}
          onFocus={focusPassword}
        />
        <IconEmail source={emailIcon} />
        <IconPassword source={passwordIcon} />
        <TouchableOpacity onPress={handleLogin}>
          <ButtonView>
            <ButtonText>Log in</ButtonText>
          </ButtonView>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};

export default LoginModal;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 155px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 215px;
  left: 35px;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: 44px;
  margin-top: 20px;
`;

const Modal = styled.View`
  width: 335px;
  height: 370px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const Logo = styled.Image`
  width: 54px;
  height: 54px;
  margin-top: 20px;
`;

const Text = styled.Text`
  margin-top: 15px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  color: #b8bece;
  text-align: center;
`;

const ButtonView = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
`;
