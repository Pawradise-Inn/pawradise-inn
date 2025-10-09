import { Outlet } from "react-router-dom";
import ManagementSideBar from "../components/Management/ManagementSideBar";

const Management = () => {
  return (
    <div className="min-h-screen flex">
      <ManagementSideBar />

      {/* Content Area */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Management;
