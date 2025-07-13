import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  }, [userInfo, token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/login`,
        { email, password }
      );
      setUserInfo(response.data.user);
      setToken(response.data.user.token);
      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/signup`,
        { name, email, password }
      );
      setUserInfo(response.data.user);
      setToken(response.data.user.token);
      alert("Signup successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/users`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.users);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const logout = () => {
    setUserInfo(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ logout, userInfo, token, login, signup, users, setUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
