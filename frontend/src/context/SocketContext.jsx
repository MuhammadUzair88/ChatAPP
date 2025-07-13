import { useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import io from "socket.io-client";
import { useContext } from "react";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo } = useAuth();
  const [OnlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    console.log(userInfo.id);
  });

  useEffect(() => {
    if (userInfo) {
      const socket = io(import.meta.env.VITE_BACKENDURL, {
        query: {
          userId: userInfo.id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ socket, OnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSocket = () => useContext(SocketContext);
export default SocketContext;
