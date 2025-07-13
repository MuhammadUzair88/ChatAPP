import React from "react";
import { useAuth } from "../../context/AuthContext";
import moment from "moment"; // optional for formatting time

function Message({ message }) {
  const { userInfo } = useAuth();
  const itsMe = message.senderId === userInfo.id; // make sure you're comparing correctly

  return (
    <div className={`flex ${itsMe ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow ${
          itsMe ? "bg-blue-500 text-white" : "bg-slate-600 text-white"
        }`}
      >
        <p>{message.message}</p>
        <span className="block text-xs text-right text-gray-200 mt-1">
          {moment(message.createdAt).format("h:mm A")}
        </span>
      </div>
    </div>
  );
}

export default Message;
