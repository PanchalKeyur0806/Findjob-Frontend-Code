import { createContext, useEffect, useState } from "react";
import usePostData from "../Hooks/FetchDataHook";
import useGetData from "../Hooks/FetchGetDataHook";
import axios from "axios";
// import Cookies from "js-cookie";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  error: null,
  progress: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  otpFunc: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [getData] = useGetData();
  const [postData, , , error, progress] = usePostData();

  const isDevelopment = import.meta.env.VITE_REACT_ENV === "development";
  const baseUrl = isDevelopment
    ? "http://localhost:7000/"
    : import.meta.env.VITE_BACKEND_URL;

  const login = async (data) => {
    try {
      const response = await postData(`${baseUrl}api/auth/login`, data);

      setUser(response?.data);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const register = async (data) => {
    try {
      const response = await postData(`${baseUrl}api/auth/register`, data);
      //   setUser(response.data);
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const otpFunc = async (data) => {
    try {
      const response = await postData(`${baseUrl}api/auth/verifyotp`, data);
      console.log(response.data);
      setUser(response.data);
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${baseUrl}api/auth/logout`, null, {
        withCredentials: true,
      });

      setIsAuthenticated(false);
    } catch (err) {
      console.error(err);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getData(`${baseUrl}api/auth/me`, {
          withCredentials: true,
        });

        setUser(response.user);
        setIsAuthenticated(true);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      }
    }

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        progress,
        isAuthenticated,
        login,
        register,
        logout,
        otpFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
