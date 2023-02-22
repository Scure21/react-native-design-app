import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SectionScreen from "../screens/SectionScreen";
import TabsNavigator from "./TabNavigator";

const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <Stack.Screen
        name="TabNav"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Section"
        component={SectionScreen}
        options={{
          title: "Section",
          headerBackTitle: "home",
          headerShown: false,
          presentation: "modal",
        }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
