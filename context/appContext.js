import { createContext, useState } from "react";

//create a context, with createContext api
export const appContext = createContext();

const AppProvider = ({ children }) => {
  // this state will be shared with all components
  const [openMenu, setOpenMenu] = useState(true);

  return (
    // this is the provider providing state
    <appContext.Provider value={[openMenu, setOpenMenu]}>
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
