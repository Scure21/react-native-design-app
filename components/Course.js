import React, { useEffect, useState } from "react";
import { Dimensions, useWindowDimensions } from "react-native";
import styled from "styled-components";

const Course = ({ image, logo, subtitle, title, avatar, caption, author }) => {
  const screenWidth = useWindowDimensions().width;

  const getCourseCardWidth = (screenWidth) => {
    let cardWidth = screenWidth - 40;
    // 768 is roughly the screen width of portrait mode ipads
    if (screenWidth >= 768) {
      cardWidth = (screenWidth - 60) / 2;
    }
    // 768 is roughly the screen width of landscape mode ipads
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

  return (
    <Container style={{ width: cardWidth }}>
      <Cover>
        <Image source={image} />
        <Logo source={logo} resizeMode="contain" />
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
      </Cover>
      <Content>
        <Avatar source={avatar} />
        <Caption>{caption}</Caption>
        <Author>Taught by {author}</Author>
      </Content>
    </Container>
  );
};

export default Course;

const Container = styled.View`
  height: 335px;
  border-radius: 14px;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  margin: 10px;
`;

const Content = styled.View`
  padding-left: 62px;
  justify-content: center;
  height: 75px;
`;

const Cover = styled.View`
  height: 260px;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  width: 170px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-transform: uppercase;
  margin-left: 20px;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 16px;
`;

const Caption = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: 500;
  max-width: 260px;
`;

const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;
