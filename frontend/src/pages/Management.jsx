import { Outlet } from "react-router-dom";
import ManagementSideBar from "../components/management/ManagementSideBar";

const Management = () => {
  return (
    <div className="min-h-screen flex">
      <ManagementSideBar />
      {/* <button className="bg-white shadow-md text-black py-2 px-4 rounded hover:bg-gray-100">
      Logout
      </button> */}

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Management;
