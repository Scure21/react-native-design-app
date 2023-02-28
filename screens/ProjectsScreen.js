import React, { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import Project from "../components/Project";
import { projectsData } from "../data/Projects";

const ProjectsScreen = () => {
  const getNextIndex = (idx) => {
    const nextIndex = idx + 1;
    if (nextIndex > projectsData.length - 1) {
      return 0;
    }
    return nextIndex;
  };

  // XY values for the first card
  const pan = useRef(new Animated.ValueXY()).current;
  // second card
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;
  // third card
  const thirdCardScale = useRef(new Animated.Value(0.8)).current;
  const thirdCardTranslateY = useRef(new Animated.Value(-50)).current;

  const index = useRef(0);
  const [idx, setIdx] = useState(0);

  const panResponder = useRef(
    /**
     * For more information about the panResponder callbacks
     * check: https://reactnative.dev/docs/panresponder
     */
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      /**
       * onPanResponderGrant is called when a gesture is "started"
       * while onPanResponderStart is called on additional gesture events.
       * For example, if you were to place one finger on the screen,
       * onPanResponderGrant would fire, then, if a second finger is placed
       * without removing the first onPanResponderStart would fire.
       */
      onPanResponderGrant: () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        // Animate third card
        Animated.spring(thirdCardScale, {
          toValue: 0.9,
          useNativeDriver: true,
        }).start();
        Animated.spring(thirdCardTranslateY, {
          toValue: 44,
          useNativeDriver: true,
        }).start();
      },
      /**
       * onPanResponderMove: Gives info about the most recent move distance is gestureState.move{X,Y}
       */
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false, // Note: panResponderMove doesn't work currently with nativeDriver
      }),
      /**
       * onPanResponderRelease, when gestures are released. e.g finger is not touching the screen
       */
      onPanResponderRelease: () => {
        // Detect x and y position to know if we ned to drop the cards
        const positionY = pan.y.__getValue();

        // If positionY is grater than 400, drop the card so it's removed from the stack
        if (positionY > 300) {
          // Dropping card animation
          Animated.timing(pan, {
            toValue: { x: 0, y: 1000 },
            useNativeDriver: true,
          }).start(({ finished }) => {
            if (finished) {
              // reset all states
              pan.setValue({ x: 0, y: 0 });
              scale.setValue(0.9);
              translateY.setValue(44);
              thirdCardScale.setValue(0.8);
              thirdCardTranslateY.setValue(-50);
              // set index
              index.current = getNextIndex(index.current);
              setIdx(getNextIndex(index.current));
            }
          });
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

          // Set third card to its initial position
          Animated.spring(thirdCardScale, {
            toValue: 0.8,
            useNativeDriver: true,
          }).start();
          Animated.spring(thirdCardTranslateY, {
            toValue: -50,
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
          title={projectsData[index.current].title}
          imgSource={projectsData[index.current].image}
          author={projectsData[index.current].author}
          text={projectsData[index.current].text}
        />
      </Animated.View>

      {/* Second card */}
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
          title={projectsData[getNextIndex(index.current)].title}
          imgSource={projectsData[getNextIndex(index.current)].image}
          author={projectsData[getNextIndex(index.current)].author}
          text={projectsData[getNextIndex(index.current)].text}
        />
      </Animated.View>

      {/* Third card */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -2,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [
            { scale: thirdCardScale },
            { translateY: thirdCardTranslateY },
          ],
        }}
      >
        <Project
          title={projectsData[getNextIndex(index.current + 1)].title}
          imgSource={projectsData[getNextIndex(index.current + 1)].image}
          author={projectsData[getNextIndex(index.current + 1)].author}
          text={projectsData[getNextIndex(index.current + 1)].text}
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
