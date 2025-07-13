import React from "react";
import Message from "./Message";
import { useCon } from "../../context/ConversationController";
import useGetSocketMessage from "../../context/useGetSocketMessage";

function Messages() {
  const { messages, loading } = useCon();
  useGetSocketMessage();

  return (
    <div className="py-2 px-3 flex-1 overflow-y-auto max-h-[80vh]">
      {loading ? (
        <p className="text-center text-gray-400 mt-4">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">
          No messages yet. Start the conversation!
        </p>
      ) : (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}
    </div>
  );
}

export default Messages;
