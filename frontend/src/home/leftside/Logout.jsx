import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

function Logout() {
  return (
    <>
      <hr className="border-gray-700" />
      <div className="h-[10vh] bg-transparent flex items-center px-4">
        <BiLogOutCircle className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2" />
      </div>
    </>
  );
}

export default Logout;
