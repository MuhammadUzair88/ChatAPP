import React from "react";
import Chatuser from "./ChatUser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import { useCon } from "../../context/ConversationController";
import NoChatSelected from "./NoChatSelected";

const Right = () => {
  const { selectedUser } = useCon();

  return (
    <div className="w-[70%] bg-gray-900 text-gray-300">
      {selectedUser ? (
        <>
          <Chatuser />
          <Messages />
          <Typesend />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default Right;
