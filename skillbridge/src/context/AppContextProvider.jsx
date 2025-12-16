import { AppContext } from "./AppContext";
import { tutors } from "../assets/assets";

const AppContextProvider = ({ children }) => {

  const value = {
    tutors,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;