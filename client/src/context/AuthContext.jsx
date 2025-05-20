import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios'
export const AppContext = createContext();
const URL=  import.meta.env.VITE_BASE_URL;
export const AppContextProvider = ({ children }) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const [coursesData,setCourseData]=useState([])

  const fetchToken = async () => {
    try {
      const newToken = await getToken();
      setToken(newToken);
    } catch (error) {
      console.error("Failed to fetch token:", error);
    }
  };

  useEffect(() => {
    fetchToken();

    const intervalId = setInterval(() => {
      fetchToken();
    }, 55 * 1000);

    return () => clearInterval(intervalId);
  }, []);


  const fetchCourse=async()=>{
    try {
      const response=await axios.get(`${URL}/v1/api/fetch-all-courses`)

      setCourseData(response.data.data || [])
    } catch (error) {
      console.log(error.response?.data || "something went wrong")
    }
  }

  useEffect(()=>{
    fetchCourse()
  },[])
  return (
    <AppContext.Provider value={{ token ,coursesData}}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
