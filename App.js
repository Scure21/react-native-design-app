import { APOLLO_CLIENT_TOKEN, SPACE_ID } from "@env";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { AppProvider } from "./context/appContext";
import AppNavigator from "./navigator/AppNavigator";

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer ${APOLLO_CLIENT_TOKEN}`,
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  </ApolloProvider>
);

export default App;
