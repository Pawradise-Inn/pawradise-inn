import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getMeAPI } from "../hooks/authAPI";
import { setUpInterceptors} from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role")
  }, []);

  useEffect(() => {
    setUpInterceptors(logout);

    const token = localStorage.getItem("token");
    if (token) {
      // getMeAPI(token)
      //   .then((res) => setUser(res.data))
      //   .catch(() => setUser(null));
      getMeAPI()
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        })
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, setUser,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
