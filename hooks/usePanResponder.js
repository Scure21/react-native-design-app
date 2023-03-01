import { useMemo, useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import { projectsData } from "../data/Projects";

export default function usePanResponder(openProjectCard) {
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

  const resetCards = () => {
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
  };

  // PanResponder callbacks
  const onMoveShouldSetPanResponder = (event, gestureState) => {
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
  };

  const onPanResponderGrant = () => {
    // Animate second card
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
  };

  const onPanResponderMove = Animated.event([null, { dx: pan.x, dy: pan.y }], {
    useNativeDriver: false, // Note: panResponderMove doesn't work currently with nativeDriver
  });

  const onPanResponderRelease = () => {
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
      resetCards();
    }
  };

  /**
   * For more information about the panResponder callbacks
   * check: https://reactnative.dev/docs/panresponder
   */
  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: onMoveShouldSetPanResponder,
      /**
       * onPanResponderGrant is called when a gesture is "started"
       * while onPanResponderStart is called on additional gesture events.
       * For example, if you were to place one finger on the screen,
       * onPanResponderGrant would fire, then, if a second finger is placed
       * without removing the first onPanResponderStart would fire.
       */
      onPanResponderGrant: onPanResponderGrant,
      /**
       * onPanResponderMove: Gives info about the most recent move distance is gestureState.move{X,Y}
       */
      onPanResponderMove: onPanResponderMove,
      /**
       * onPanResponderRelease, when gestures are released. e.g finger is not touching the screen
       */
      onPanResponderRelease: onPanResponderRelease,
    });
  }, [openProjectCard]);

  return {
    idx,
    idxSecondCard: getNextIndex(idx),
    idxThirdCard: getNextIndex(idx + 1),
    pan,
    scale,
    translateY,
    thirdCardScale,
    thirdCardTranslateY,
    panHandlers: panResponder.panHandlers,
  };
}
