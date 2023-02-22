import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CoursesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CoursesScreen</Text>
    </View>
  );
};

export default CoursesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
