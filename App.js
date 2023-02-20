import { AppProvider } from "./context/appContext";
import HomeScreen from "./screens/homeScreen";

const App = () => (
  <AppProvider>
    <HomeScreen />
  </AppProvider>
);

export default App;
