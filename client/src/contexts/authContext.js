import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_TOKEN_STORAGE } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
  // Check authenticated
  const loadUser = async () => {
    if (localStorage[LOCAL_TOKEN_STORAGE]) {
      setAuthToken(localStorage[LOCAL_TOKEN_STORAGE]);
    }

    try {
      const res = await axios.get(`${apiUrl}/auth`);
      if (res.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: res.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_TOKEN_STORAGE);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const login = async (userForm) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (res.data.success) {
        localStorage.setItem(LOCAL_TOKEN_STORAGE, res.data.token);
      }
      await loadUser();
      return res.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const register = async (form) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, form);
      if (res.data.success) {
        localStorage.setItem(LOCAL_TOKEN_STORAGE, res.data.token);
      }
      await loadUser();
      return res.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_TOKEN_STORAGE);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };
  // Context data
  const authContextData = { login, register, authState, logoutUser };

  // return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
