import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [tutors, setTutors] = useState([]);
    
    const getAllTutors = async () => {
      console.trace("getAllTutors called");
    try {

        const {data} = await axios.post(`${backendUrl}/api/admin/all-tutors`, {}, {headers: {aToken}});
        if(data.success){
          setTutors(data.tutors);
          console.log(data.tutors);

        } else{
          toast.error(data.message);
        }
        
      } catch (error) {
        toast.error(error.message);
      }
    }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    tutors,
    getAllTutors
  };

  return (
    <AdminContext.Provider value={value}>
    {props.children}
    </AdminContext.Provider>
  );
};

export { AdminContext };
export default AdminContextProvider;