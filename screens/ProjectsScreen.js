import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import Project from "../components/Project";
import { useApp } from "../context/appContext";
import { projectsData } from "../data/Projects";
import usePanResponder from "../hooks/usePanResponder";

const ProjectsScreen = () => {
  const {
    state: { openProjectCard },
  } = useApp();

  const {
    idx,
    pan,
    scale,
    idxSecondCard,
    idxThirdCard,
    translateY,
    thirdCardScale,
    thirdCardTranslateY,
    panHandlers,
    maskOpacity,
  } = usePanResponder(openProjectCard);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.mask, { opacity: maskOpacity }]} />

      <Animated.View
        style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
        {...panHandlers}
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
        style={[
          styles.backGroundCard,
          {
            transform: [{ scale }, { translateY }],
          },
        ]}
      >
        <Project
          title={projectsData[idxSecondCard].title}
          imgSource={projectsData[idxSecondCard].image}
          author={projectsData[idxSecondCard].author}
          text={projectsData[idxSecondCard].text}
        />
      </Animated.View>

      {/* Third card */}
      <Animated.View
        style={[
          styles.backGroundCard,
          { zIndex: -2 },
          {
            transform: [
              { scale: thirdCardScale },
              { translateY: thirdCardTranslateY },
            ],
          },
        ]}
      >
        <Project
          title={projectsData[idxThirdCard].title}
          imgSource={projectsData[idxThirdCard].image}
          author={projectsData[idxThirdCard].author}
          text={projectsData[idxThirdCard].text}
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
  backGroundCard: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mask: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: -3,
  },
});
