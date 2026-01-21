import { AppContext } from "./AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContextProvider = ({ children }) => {

  
  const currencySymbol = '$';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [tutors, setTutors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    let isMounted = true;

    const getTutorsData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/tutor/list`);
        if (isMounted) {
        if (data.success) {
          setTutors(data.tutors);
        } else {
          toast.error(data.message);
        }
      }
      } catch (error) {
        if (isMounted) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
    getTutorsData();
    return () => {
      isMounted = false;
    };
  }, [backendUrl]);
  
 useEffect(() => {
   const loadUserProfileData = async () => {
     try {
       const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
         headers: { token },
       });

       console.log("User profile loaded:", data.userData);

       if (data.success) {
         setUserData(data.userData);
       } else {
         toast.error(data.message);
       }
     } catch (error) {
       toast.error(error.message);
       console.log(error);
     }
   };

   if (token) loadUserProfileData();
 }, [token, backendUrl]);

  const value = {
    tutors,
    currencySymbol,
    token, setToken,
    backendUrl,
    userData, setUserData,
   
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;