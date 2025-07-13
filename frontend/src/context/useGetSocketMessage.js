import React, { useEffect } from "react";
import { useSocket } from "./SocketContext";
import { useCon } from "./ConversationController.jsx";
const useGetSocketMessage = () => {
const {socket}=useSocket();
const {messages,setMessages}=useCon();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {

      setMessages([...messages, newMessage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};
export default useGetSocketMessage;