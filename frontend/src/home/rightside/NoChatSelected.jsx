import { CiMenuFries } from "react-icons/ci";

const NoChatSelected = () => {
  return (
    <div className="relative h-screen w-full bg-slate-900 text-white">
      {/* Mobile Drawer Toggle */}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute top-4 left-4 z-10"
      >
        <CiMenuFries className="text-2xl" />
      </label>

      {/* Centered Message */}
      <div className="flex h-full items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Welcome Back!</h1>
          <p className="text-gray-300">
            No chat selected. Please start a conversation by choosing a contact
            from the list.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
