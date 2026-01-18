import { AppContext } from "./AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContextProvider = ({ children }) => {


  const currencySymbol = '$';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [tutors, setTutors] = useState([]);

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
    }};

    getTutorsData();
    return () => {
      isMounted = false;
    };
  }, [backendUrl]);


  const value = {
    tutors,
    currencySymbol,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;