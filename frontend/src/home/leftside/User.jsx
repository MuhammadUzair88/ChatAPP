import React from "react";
import { useCon } from "../../context/ConversationController";
import { useEffect } from "react";

function User({ name, email, id, onlineusers }) {
  const { selectedUser, setSelectedUser } = useCon();

  useEffect(() => {
    console.log(selectedUser);
  });

  return (
    <div
      onClick={() => setSelectedUser(id)}
      className={`cursor-pointer transition-colors duration-200 rounded-md ${
        selectedUser === id ? "bg-slate-700" : "hover:bg-slate-700"
      }`}
    >
      <div className="flex items-center space-x-4 px-6 py-3">
        {/* Avatar with online indicator */}
        <div className="relative">
          <img
            src="/img.jpeg"
            alt="User Avatar"
            className="w-12 h-12 object-cover rounded-full border border-slate-600"
          />
          {onlineusers.includes(id) && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full" />
          )}
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-white font-semibold text-base leading-tight">
            {name}
          </h2>
          <p className="text-gray-400 text-sm">{email}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
