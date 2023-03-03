import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, useWindowDimensions } from "react-native";

const Loading = ({ isActive }) => {
  const { height } = useWindowDimensions();
  const [top] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(0));

  const animationRef = useRef();

  useEffect(() => {
    animationRef.current.play();

    if (isActive) {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, { toValue: 1, useNativeDriver: false }).start();

      animationRef.current.play();
    } else {
      Animated.timing(top, {
        toValue: height,
        duration: 0,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, { toValue: 0, useNativeDriver: false }).start();

      animationRef.current.loop = false;
    }
  }, [isActive]);

  return (
    <Animated.View style={[styles.container, { top, opacity }]}>
      <LottieView
        source={require("../assets/loading.json")}
        autoPlay={false}
        loop={true}
        ref={(animation) => (animationRef.current = animation)}
      />
    </Animated.View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
});
