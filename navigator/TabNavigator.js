import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoursesScreen from "../screens/CoursesScreen";
import HomeScreen from "../screens/homeScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import SectionScreen from "../screens/SectionScreen";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const CoursesStack = createNativeStackNavigator();
const ProjectStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeStack"
      component={HomeScreen}
      options={{
        title: "Home",
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="Section"
      component={SectionScreen}
      options={{
        title: "Section",
        headerBackTitle: "home",
        headerShown: false,
      }}
    />
  </HomeStack.Navigator>
);

const CoursesStackScreen = () => (
  <CoursesStack.Navigator>
    <CoursesStack.Screen
      name="CoursesStack"
      component={CoursesScreen}
      options={{
        title: "Courses",
        headerShown: false,
      }}
    />
  </CoursesStack.Navigator>
);

const ProjectStackScreen = () => (
  <ProjectStack.Navigator>
    <ProjectStack.Screen
      name="ProjectsStack"
      component={ProjectsScreen}
      options={{
        title: "Projects",
        headerShown: false,
      }}
    />
  </ProjectStack.Navigator>
);

const TabsNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-home"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-albums"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Project"
        component={ProjectStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-folder"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
