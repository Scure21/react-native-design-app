import { useEffect, useState } from "react";
import { Dimensions, useWindowDimensions } from "react-native";

export default function useCourseCardWidth() {
  const screenWidth = useWindowDimensions().width;

  const getCourseCardWidth = (screenWidth) => {
    let cardWidth = screenWidth - 40;
    // 768 is roughly the screen width of portrait mode ipads
    if (screenWidth >= 768) {
      cardWidth = (screenWidth - 60) / 2;
    }
    // 1024 is roughly the screen width of landscape mode ipads
    if (screenWidth >= 1024) {
      cardWidth = (screenWidth - 80) / 3;
    }
    return cardWidth;
  };

  const [cardWidth, setCardWidth] = useState(getCourseCardWidth(screenWidth));

  const adaptLayout = (dimensions) => {
    setCardWidth(getCourseCardWidth(dimensions.window.width));
  };

  useEffect(() => {
    // Adapt layout when dimensions change to avoid weird behavior
    Dimensions.addEventListener("change", adaptLayout);
  }, [cardWidth]);

  return { cardWidth };
}
