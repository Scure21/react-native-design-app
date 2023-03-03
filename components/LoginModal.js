import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components";
import { useApp } from "../context/appContext";
import Loading from "./Loading";
import Success from "./Success";

const LoginModal = () => {
  const { height } = useWindowDimensions();
  const {
    state: { openLogin },
    dispatch,
  } = useApp();

  // property to control the modal being on the screen or not
  const [top] = useState(new Animated.Value(height));
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIcon, setEmailIcon] = useState(
    require("../assets/icon-email.png")
  );
  const [passwordIcon, setPasswordIcon] = useState(
    require("../assets/icon-password.png")
  );
  // Properties to animate the login modal
  const [scale] = useState(new Animated.Value(1.3));
  const [translateY] = useState(new Animated.Value(0));

  const handleLogin = () => {
    console.log(email, password);
    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      // Stop loading and show success
      setIsLoading(false);
      setSuccessfulLogin(true);

      setTimeout(() => {
        dispatch({ type: "closeLogin" });
        setSuccessfulLogin(false);

        // show alert after login
        Alert.alert("You logged in successfully!");
      }, 2000);
    }, 2000);
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
    dispatch({ type: "closeLogin" });
  };

  useEffect(() => {
    if (openLogin) {
      // Make modal render on the screen
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();

      // openLogin modal animation
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => {
        // Make login modal disappear from the screen
        Animated.timing(top, {
          toValue: height,
          duration: 0,
          useNativeDriver: false,
        }).start();

        // closeLogin animation to drop from the screen
        Animated.spring(scale, { toValue: 1.3, useNativeDriver: true }).start();
      }, 500);

      Animated.timing(translateY, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [openLogin]);

  return (
    <AnimatedContainer style={{ top }}>
      <TouchableWithoutFeedback onPress={onBackgroundTap}>
        <BlurView
          tint="default"
          intensity={100}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </TouchableWithoutFeedback>
      <AnimatedModal style={{ transform: [{ scale }, { translateY }] }}>
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
      </AnimatedModal>
      <Success isActive={successfulLogin} />
      <Loading isActive={isLoading} />
    </AnimatedContainer>
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

const AnimatedContainer = Animated.createAnimatedComponent(Container);

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

const AnimatedModal = Animated.createAnimatedComponent(Modal);

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
