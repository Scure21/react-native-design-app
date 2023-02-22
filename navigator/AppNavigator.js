import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./TabNavigator";

const AppNavigator = () => (
  <NavigationContainer>
    <TabsNavigator />
  </NavigationContainer>
);

export default AppNavigator;
