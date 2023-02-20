import { createContext, useContext, useReducer } from "react";

//create a context, with createContext api
export const appContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case "openMenu":
      return { openMenu: state.openMenu };
    case "closeMenu":
      return { openMenu: !state.openMenu };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AppProvider = ({ children }) => {
  // this state will be shared with all components
  const [state, dispatch] = useReducer(appReducer, { openMenu: true });
  const value = { state, dispatch };
  return (
    // this is the provider providing state
    <appContext.Provider value={value}>{children}</appContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(appContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

export { AppProvider, useApp };
