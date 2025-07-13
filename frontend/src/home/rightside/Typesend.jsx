import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { useCon } from "../../context/ConversationController";
import axios from "axios";

function Typesend() {
  const { token } = useAuth();
  const { selectedUser, fetchMessages } = useCon();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "", "sending", "sent", "error"

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setStatus("sending");
      await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/message/send/${selectedUser}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("");
      setStatus("sent");
      fetchMessages(selectedUser);
      setTimeout(() => setStatus(""), 2000); // clear "sent" after 2s
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000); // clear "error" after 3s
    }
  };

  return (
    <div className="flex flex-col space-y-1 h-[10vh] bg-gray-800 px-4 pt-2">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          placeholder="Type here"
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow border border-gray-700 rounded-xl outline-none px-4 py-3 bg-transparent text-white placeholder-gray-400"
        />
        <button
          onClick={sendMessage}
          disabled={status === "sending"}
          className={`text-white transition ${
            status === "sending"
              ? "opacity-50 cursor-not-allowed"
              : "hover:text-blue-400"
          }`}
        >
          <IoSend className="text-3xl" />
        </button>
      </div>

      {/* Status Indicator */}
      <div className="h-4 text-sm text-right pr-2">
        {status === "sending" && (
          <span className="text-yellow-400">Sending...</span>
        )}
        {status === "sent" && <span className="text-green-400">Sent ✅</span>}
        {status === "error" && (
          <span className="text-red-400">Failed to send ❌</span>
        )}
      </div>
    </div>
  );
}

export default Typesend;
