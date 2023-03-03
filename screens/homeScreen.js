import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Query } from "react-apollo";
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import Course from "../components/Course";
import { NotificationIcon } from "../components/Icons";
import LoginModal from "../components/LoginModal";
import Logo from "../components/Logo";
import { useApp } from "../context/appContext";
import { coursesData } from "../data/Courses";
import { logosData } from "../data/Logos";
import CardsQuery from "../queries/Cards";

const HomeScreen = ({ navigation }) => {
  const {
    state: { openMenu },
    dispatch,
  } = useApp();

  const [scale] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));
  const [statusBarStyle, setStatusBarStyle] = useState("dark");

  const toggleMenu = useCallback(() => {
    if (openMenu) {
      open();
    } else {
      close();
    }
  }, [openMenu]);

  const open = () => {
    // scaling animation
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 300,
      easing: Easing.in(),
      useNativeDriver: false,
    }).start();

    // opacity animation
    Animated.spring(opacity, {
      toValue: 0.5,
      useNativeDriver: false,
    }).start();

    // Set the status bar to light
    setStatusBarStyle("light");
  };

  const close = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 300,
      easing: Easing.in(),
      useNativeDriver: false,
    }).start();

    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

    setStatusBarStyle("dark");
  };

  useEffect(() => {
    toggleMenu();
  }, [openMenu, statusBarStyle]);

  return (
    <RootView>
      <StatusBar style={statusBarStyle} animated={true} />
      {/* <Menu /> */}
      <AnimatedContainer style={{ transform: [{ scale }], opacity }}>
        <SafeAreaView>
          {/* ScrollView to make all the screen scrollable */}
          <ScrollView style={{ height: "100%" }}>
            <TitleBar>
              <TouchableOpacity
                onPress={() => dispatch({ type: "openLogin" })}
                style={{ position: "absolute", top: 0, left: 20 }}
              >
                <Avatar source={require("../assets/avatar.jpg")} />
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>Stephanie</Name>
              <NotificationIcon
                style={{ position: "absolute", right: 20, top: 5 }}
              />
            </TitleBar>
            {/* ScrollView to make the logos horizontally scrollable */}
            <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {logosData.map((logo, id) => (
                <Logo key={id} image={logo.image} text={logo.text} />
              ))}
            </ScrollView>
            <Subtitle>Continue Learning</Subtitle>
            {/* ScrollView to make the cards section horizontally scrollable */}
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30 }}
              showsHorizontalScrollIndicator={false}
            >
              {/* Apollo query to get the cards data */}
              <Query query={CardsQuery}>
                {({ loading, error, data }) => {
                  if (loading) return <Message>Loading...</Message>;
                  if (error) return <Message>Error...</Message>;

                  return (
                    <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                      {data.cardsCollection.items.map((card, idx) => {
                        return (
                          <Pressable
                            key={idx}
                            onPress={() =>
                              navigation.navigate("Section", {
                                section: card,
                              })
                            }
                          >
                            <Card
                              title={card.title}
                              image={card.image}
                              caption={card.caption}
                              logo={card.logo}
                              subtitle={card.subtitle}
                              content={card.content}
                            />
                          </Pressable>
                        );
                      })}
                    </View>
                  );
                }}
              </Query>
            </ScrollView>
            <Subtitle>Popular Courses</Subtitle>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingLeft: 10,
              }}
            >
              {coursesData.map((course, index) => (
                <Course
                  key={index}
                  image={course.image}
                  title={course.title}
                  subtitle={course.subtitle}
                  logo={course.logo}
                  author={course.author}
                  avatar={course.avatar}
                  caption={course.caption}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
      <LoginModal />
    </RootView>
  );
};

export default HomeScreen;

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Container = styled.View`
  background: #f0f3f5;
  flex: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
`;
const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;
