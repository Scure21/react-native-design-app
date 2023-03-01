import React, { useMemo, useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import Project from "../components/Project";
import { useApp } from "../context/appContext";
import { projectsData } from "../data/Projects";

const ProjectsScreen = () => {
  const {
    state: { openProjectCard },
  } = useApp();

  const getNextIndex = (idx) => {
    const nextIndex = idx + 1;
    if (nextIndex > projectsData.length - 1) {
      return 0;
    }
    return nextIndex;
  };

  // XY values for the first card
  const [pan] = useState(new Animated.ValueXY());
  // second card
  const [scale] = useState(new Animated.Value(0.9));
  const [translateY] = useState(new Animated.Value(44));
  // third card
  const [thirdCardScale] = useState(new Animated.Value(0.8));
  const [thirdCardTranslateY] = useState(new Animated.Value(-50));

  const index = useRef(0);
  const [idx, setIdx] = useState(0);

  const panResponder = useMemo(() => {
    /**
     * For more information about the panResponder callbacks
     * check: https://reactnative.dev/docs/panresponder
     */
    return PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        // enable pan gesture only when the card is moving, this prevents
        // conflicts between the tap and pan gestures
        if (gestureState.dx === 0 && gestureState.dy === 0) {
        } else {
          if (openProjectCard) {
            return false;
          } else {
            return true;
          }
        }
      },
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
    });
  }, [openProjectCard]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
        {...panResponder.panHandlers}
      >
        <Project
          title={projectsData[idx].title}
          imgSource={projectsData[idx].image}
          author={projectsData[idx].author}
          text={projectsData[idx].text}
          canOpen={true}
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
          title={projectsData[getNextIndex(idx)].title}
          imgSource={projectsData[getNextIndex(idx)].image}
          author={projectsData[getNextIndex(idx)].author}
          text={projectsData[getNextIndex(idx)].text}
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
          title={projectsData[getNextIndex(idx + 1)].title}
          imgSource={projectsData[getNextIndex(idx + 1)].image}
          author={projectsData[getNextIndex(idx + 1)].author}
          text={projectsData[getNextIndex(idx + 1)].text}
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
