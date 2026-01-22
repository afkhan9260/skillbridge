import { AppContext } from "./AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [tutors, setTutors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(null);

  // Getting Doctors using API
  const getTutorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/tutor/list");
      if (data.success) {
        setTutors(data.tutors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting User Profile using API
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTutorsData();
  }, []);

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadUserProfileData(); //async
    }
  }, [token]);

  const value = {
    tutors,
    getTutorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return(
     <AppContext.Provider value={value}>
      {children}
     </AppContext.Provider>
    )
};

export default AppContextProvider;