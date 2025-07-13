import React from "react";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      {/* Drawer toggle for mobile */}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>

      {/* User Info */}
      <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300 px-4 rounded-md">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img
              src="/img.jpeg"
              alt="User Avatar"
              className="w-12 h-12 object-cover rounded-full border border-slate-600"
            />
          </div>
        </div>
        <div>
          <h1 className="text-white text-lg font-semibold">John Doe</h1>
          <span className="text-sm text-gray-400">Online</span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
