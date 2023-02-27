import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import Project from "../components/Project";

const ProjectsScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
        {...panResponder.panHandlers}
      >
        <Project
          title="Price Tag"
          imgSource={require("../assets/background5.jpg")}
          author="Stephanie Cure"
          text="Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China."
        />
      </Animated.View>
    </View>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
