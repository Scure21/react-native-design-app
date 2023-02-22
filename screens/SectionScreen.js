import React from "react";
import { Button, Text } from "react-native";
import styled from "styled-components";

const SectionScreen = ({ navigation }) => {
  return (
    <Container>
      <Text>SectionScreen</Text>
      <Button title="close" onPress={() => navigation.goBack()}></Button>
    </Container>
  );
};

export default SectionScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
