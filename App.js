import { AppProvider } from "./context/appContext";
import AppNavigator from "./navigator/AppNavigator";

const App = () => (
  <AppProvider>
    <AppNavigator />
  </AppProvider>
);

export default App;
