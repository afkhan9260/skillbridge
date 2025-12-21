import { AppContext } from "./AppContext";
import { tutors } from "../assets/assets";

const AppContextProvider = ({ children }) => {


  const currencySymbol = '$';
  const value = {
    tutors, 
    currencySymbol
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;