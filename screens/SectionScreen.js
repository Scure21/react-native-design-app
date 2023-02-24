import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import MarkDownWrapper from "../components/MarkDown";

const SectionScreen = ({ navigation, route }) => {
  const [statusBarStyle, setStatusBarStyle] = useState("light");
  const { section } = route.params;

  useEffect(() => {
    if (Platform.OS === "android") setStatusBarStyle("dark");
    return () => setStatusBarStyle("dark");
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <StatusBar style={statusBarStyle} />
        <Cover>
          <Image source={section.image} />
          <Wrapper>
            <Logo source={section.logo} />
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>
          <Title>{section.title}</Title>
          <Caption>{section.caption}</Caption>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <CloseView>
            <Ionicons
              name="ios-close"
              size={36}
              color="#4775f2"
              style={{ marginTop: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {/* <WebViewWrapper content={section.content} htmlStyles={htmlStyles} /> */}
          <MarkDownWrapper content={section.content} htmlStyles={htmlStyles} />
        </Content>
      </Container>
    </ScrollView>
  );
};

export default SectionScreen;

// example HTML content that can be pass down to the webView or MarkDown
const htmlContent = `
  <h2>This is a title</h2>
  <p>This <strong>is</strong> a <a href="http://designcode.io">link</a></p>
  <img src="https://cl.ly/c0b07504bfec/download/background4.jpg" />
`;

const htmlStyles = `
    * {
      font-family: -apple-system, Roboto;
      margin: 0;
      padding: 0;
      font-size: 20px;
      font-weight: normal;
      color: #3c4560;
      line-height: 24px;
    }
    
    h2 {
      font-size: 30px;
      text-transform: uppercase;
      color: #b8bece;
      font-weight: 600;
      margin-top: 50px;
    }
  
    p {
      margin-top: 30px;
    }
  
    a {
      color: #4775f2;
      font-weight: 600;
      text-decoration: none;
    }
  
    strong {
      font-weight: 700;
    }
    
    img {
      width: 100%;
      border-radius: 20px;
      margin-top: 30px;
    }
    
    pre {
      padding: 20px;
      background: #212C4F;
      overflow: hidden;
      word-wrap: break-word;
      border-radius: 10px;
      margin-top: 20px;
    }
    
    code {
      color: white;
    }
`;

const Content = styled.View`
  height: 1000px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;
