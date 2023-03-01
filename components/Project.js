import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  Animated,
  Pressable,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components";
import { useApp } from "../context/appContext";

const Project = ({ imgSource, title, author, text, canOpen }) => {
  const {
    state: { openProjectCard },
    dispatch,
  } = useApp();

  const { height, width } = useWindowDimensions();
  const tabBarHeight = 47; // This is roughly the height for an iPhone XS

  const [cardWidth] = useState(new Animated.Value(315));
  const [cardHeight] = useState(new Animated.Value(460));
  const [buttonOpacity] = useState(new Animated.Value(0));

  const openCard = useCallback(() => {
    dispatch({ type: "openProjectCard" });
    if (!canOpen) return;

    Animated.spring(cardWidth, {
      toValue: width,
      useNativeDriver: false, // TLDR; Width and Height are not supported by the native driver. Can't be animated natively. We have to do it with JS
    }).start();

    Animated.spring(cardHeight, {
      toValue: height - tabBarHeight,
      useNativeDriver: false,
    }).start();

    Animated.timing(buttonOpacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    // hide status bar
    StatusBar.setHidden(true);
  }, []);

  const closeCard = () => {
    dispatch({ type: "closeProjectCard" });

    Animated.spring(cardWidth, {
      toValue: 315,
      useNativeDriver: false,
    }).start();

    Animated.spring(cardHeight, {
      toValue: 460,
      useNativeDriver: false,
    }).start();

    Animated.timing(buttonOpacity, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    // hide status bar
    StatusBar.setHidden(false);
  };

  return (
    <Pressable onPress={openCard}>
      <StatusBar />
      <AnimatedContainer
        style={{ elevation: 10, width: cardWidth, height: cardHeight }}
      >
        <Cover>
          <Image source={imgSource} />
          <Title>{title}</Title>
          <Author>by {author}</Author>
        </Cover>

        <Text>{text}</Text>

        <TouchableOpacity
          onPress={closeCard}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <AnimatedCloseView style={{ opacity: buttonOpacity }}>
            <Ionicons name="ios-close" size={32} color="#546bfb" />
          </AnimatedCloseView>
        </TouchableOpacity>
      </AnimatedContainer>
    </Pressable>
  );
};

export default Project;

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);
