import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Animated, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components";
import { useApp } from "../context/appContext";
import MenuItem from "./MenuItem";

let screenHeight;

const Menu = () => {
  screenHeight = useWindowDimensions().height;

  const {
    state: { openMenu },
    dispatch,
  } = useApp();

  const [top] = useState(new Animated.Value(screenHeight));

  const open = () => {
    Animated.spring(top, {
      toValue: 58,
      useNativeDriver: false,
    }).start();
  };

  const close = () => {
    Animated.spring(top, {
      toValue: screenHeight,
      useNativeDriver: false,
    }).start();
  };

  const toggleMenu = () => {
    if (openMenu) {
      open();
    } else {
      close();
    }
  };

  useEffect(() => {
    toggleMenu();
  }, [openMenu]);

  return (
    <AnimatedContainer style={{ top }}>
      <Cover>
        <Image source={require("../assets/background2.jpg")} />
        <Title>Stephanie Cure</Title>
        <SubTitle>Staff Software Engineer at Willowtree</SubTitle>
      </Cover>
      <TouchableOpacity
        onPress={() => dispatch({ type: "closeMenu" })}
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          marginLeft: -22,
          zIndex: 1,
        }}
      >
        <CloseView>
          <Ionicons name="ios-close" size={44} color="#546bfb" />
        </CloseView>
      </TouchableOpacity>
      <Content>
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            icon={item.icon}
            title={item.title}
            text={item.text}
          />
        ))}
      </Content>
    </AnimatedContainer>
  );
};

export default Menu;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
`;

const SubTitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  height: ${screenHeight ? screenHeight : "900px"};
  background: #f0f3f5;
  padding: 50px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

// DATA
const items = [
  {
    icon: "ios-settings",
    title: "Account",
    text: "settings",
  },
  {
    icon: "ios-card",
    title: "Billing",
    text: "payments",
  },
  {
    icon: "ios-compass",
    title: "Learn React",
    text: "start course",
  },
  {
    icon: "ios-exit",
    title: "Log out",
    text: "see you soon!",
  },
];
