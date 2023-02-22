import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProjectsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProjectsScreen</Text>
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
