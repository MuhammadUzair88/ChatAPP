import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";

function Logout() {
  const { logout } = useAuth();

  return (
    <>
      <hr className="border-gray-700" />
      <div className="h-[10vh] bg-transparent flex items-center px-4">
        <BiLogOutCircle
          onClick={logout}
          className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2"
        />
      </div>
    </>
  );
}

export default Logout;
