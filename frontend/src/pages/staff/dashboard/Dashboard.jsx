import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center mt-16 px-4 sm:px-8">
      <h2 className="w-full text-5xl font-extrabold mb-8 text-left">Dashboard</h2>

      {/* Centered Tabs Wrapper */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="flex justify-center overflow-x-auto space-x-4 pb-2">
          
          {/* NavLink for Today's Booking */}
          <NavLink
            to="/staff/dashboard"
            className={({ isActive }) =>
              `flex-shrink-0 px-12 py-6 rounded-xl transition-all duration-300
               text-base sm:text-lg md:text-2xl font-semibold
               ${
                 isActive
                   ? "bg-[var(--light-brown-color)] font-bold text-gray-800 shadow-lg"
                   : "bg-transparent text-gray-800 hover:bg-[var(--light-brown-color)]"
               }`
            }
            end
          >
            Today's Booking
          </NavLink>

          {/* NavLink for Check-in */}
          <NavLink
            to="/staff/dashboard/check-in"
            className={({ isActive }) =>
              `flex-shrink-0 px-12 py-6 rounded-xl transition-all duration-300
               text-base sm:text-lg md:text-2xl font-semibold
               ${
                 isActive
                   ? "bg-[var(--light-brown-color)] font-bold text-gray-800 shadow-lg"
                   : "bg-transparent text-gray-800 hover:bg-[var(--light-brown-color)]"
               }`
            }
            end
          >
            Check-in
          </NavLink>

          {/* NavLink for Check-out */}
          <NavLink
            to="/staff/dashboard/check-out"
            className={({ isActive }) =>
              `flex-shrink-0 px-12 py-6 rounded-xl transition-all duration-300
               text-base sm:text-lg md:text-2xl font-semibold
               ${
                 isActive
                   ? "bg-[var(--light-brown-color)] font-bold text-gray-800 shadow-lg"
                   : "bg-transparent text-gray-800 hover:bg-[var(--light-brown-color)]"
               }`
            }
            end
          >
            Check-out
          </NavLink>

          {/* NavLink for Service booked */}
          <NavLink
            to="/staff/dashboard/service-booked"
            className={({ isActive }) =>
              `flex-shrink-0 px-12 py-6 rounded-xl transition-all duration-300
               text-base sm:text-lg md:text-2xl font-semibold
               ${
                 isActive
                   ? "bg-[var(--light-brown-color)] font-bold text-gray-800 shadow-lg"
                   : "bg-transparent text-gray-800 hover:bg-[var(--light-brown-color)]"
               }`
            }
            end
          >
            Service booked
          </NavLink>

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