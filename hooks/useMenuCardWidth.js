import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

export default function useMenuCardWidth() {
  let screenWidth = useWindowDimensions().width;
  const [cardWidth, setCardWidth] = useState(screenWidth);

  useEffect(() => {
    // 500 is the width of an iPhone XS Max in portrait mode
    if (screenWidth > 500) {
      setCardWidth(500);
    }
  }, [screenWidth]);
  return { cardWidth };
}
