import React from "react";
import User from "./User";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";

function Users() {
  const { users } = useAuth();
  const { OnlineUsers } = useSocket();
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {users.map((user) => (
          <User
            key={user._id}
            name={user.name}
            email={user.email}
            id={user._id}
            onlineusers={OnlineUsers}
          />
        ))}
      </div>
    </div>
  );
}

export default Users;
