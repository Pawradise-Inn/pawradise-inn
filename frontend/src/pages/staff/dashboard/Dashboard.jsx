import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center mt-16 px-4 sm:px-8">
      <h2 className="w-full text-5xl font-extrabold mb-8 text-left">
        Dashboard
      </h2>

      {/* Centered Tabs Wrapper */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="flex justify-center overflow-x-auto space-x-4 pb-2">
          {/* NavLink for Today's Booking */}
          <Navbar
            pages={[
              "Today's Booking",
              "Check In",
              "Check Out",
              "Service Booked",
            ]}
            paths={["", "check-in", "check-out", "service-booked"]}
            pathIdxHighlight={3}
            prevPath="/staff/dashboard"
            mainStyle="flex-shrink-0 px-12 py-6 rounded-xl transition-all duration-300
               text-base sm:text-lg md:text-2xl font-semibold"
            element="dashboard-nav"
          />
        </div>

        {/* Extended Underline */}
        <div
          className="absolute bottom-0 h-[2px] bg-gray-700"
          style={{
            width: "120%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Content Area */}
      <div className="w-full flex justify-center mt-8 px-2 sm:px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
