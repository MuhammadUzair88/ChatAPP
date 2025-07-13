import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchMessages = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKENDURL}/api/message/get/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const conversation = response.data.conversation;
      if (conversation && conversation.messages) {
        setMessages(conversation.messages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error.message);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser);
    }
  }, [selectedUser]);

  return (
    <ConversationContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        messages,
        setMessages,
        loading,
        fetchMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useCon = () => useContext(ConversationContext);
export default ConversationContext;
