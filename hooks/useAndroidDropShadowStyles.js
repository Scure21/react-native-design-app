import { Platform } from "react-native";

export default function useAndroidDropShadowStyles() {
  if (Platform.OS === "android") {
    return {
      elevation: 8,
      shadowColor: "rgb(42,58,75)",
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 10,
      shadowOpacity: 0.08,
    };
  }
  return {};
}
