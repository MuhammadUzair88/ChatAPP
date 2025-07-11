import React from "react";

function User() {
  return (
    <div className="hover:bg-slate-700 transition-colors duration-200 rounded-md">
      <div className="flex items-center space-x-4 px-6 py-3">
        {/* Avatar with online indicator */}
        <div className="relative">
          <img
            src="/img.jpeg"
            alt="User Avatar"
            className="w-12 h-12 object-cover rounded-full border border-slate-600"
          />
          {/* Online Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full" />
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-white font-semibold text-base leading-tight">
            John Doe
          </h2>
          <p className="text-gray-400 text-sm">john@example.com</p>
        </div>
      </div>
    </div>
  );
}

export default User;
