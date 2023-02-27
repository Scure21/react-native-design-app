import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import Project from "../components/Project";
import { projectsData } from "../data/Projects";

const ProjectsScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderGrant: () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false, // Note: panResponderMove doesn't work currently with nativeDriver
      }),
      onPanResponderRelease: () => {
        // Detect x and y position to know if we ned to drop the cards
        const positionY = pan.y.__getValue();

        // If positionY is grater than 400, drop the card so it's removed from the stack
        if (positionY > 400) {
          Animated.timing(pan, {
            toValue: { x: pan.x, y: 1000 },
            useNativeDriver: true,
          }).start();
        } else {
          // Set first card to its initial position
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();

          // Set second card to its initial position so it goes back
          Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true,
          }).start();
          Animated.spring(translateY, {
            toValue: 44,
            useNativeDriver: true,
          }).start();
        }
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
          title={projectsData[0].title}
          imgSource={projectsData[0].image}
          author={projectsData[0].author}
          text={projectsData[0].text}
        />
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale }, { translateY }],
        }}
      >
        <Project
          title={projectsData[1].title}
          imgSource={projectsData[1].image}
          author={projectsData[1].author}
          text={projectsData[1].text}
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
