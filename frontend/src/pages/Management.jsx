import { NavLink, Outlet } from "react-router-dom";

const Management = () => {
  return (  
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="text-center w-60 p-4 flex flex-col space-y-16 font-semibold mr-10 mt-10 mb-10 border-r border-gray-300 ">
        <NavLink
          to="/staff/management"
          className={({ isActive }) =>
            `px-4 py-4 rounded transition-all duration-300 ease-in-out ${
              isActive ? "bg-[var(--dark-brown-color)] font-bold !text-white" : ""
            }`
          }
          end
        >
          Service
        </NavLink>

        <NavLink
          to="/staff/management/room"
          className={({ isActive }) =>
            `px-4 py-4 rounded transition-all duration-300 ease-in-out ${
              isActive ? "bg-[var(--dark-brown-color)] font-bold !text-white" : ""
            }`
          }
          end
        >
          Room
        </NavLink>

        <NavLink
          to="/staff/management/payment"
          className={({ isActive }) =>
            `px-4 py-4 rounded transition-all duration-300 ease-in-out ${
              isActive ? "bg-[var(--dark-brown-color)] font-bold !text-white" : ""
            }`
          }
        >
          Payment
        </NavLink>  


        <NavLink
          to="/staff/management/profile"
          className={({ isActive }) =>
            `px-4 py-4 rounded transition-all duration-300 ease-in-out ${
              isActive ? "bg-[var(--dark-brown-color)] font-bold !text-white" : ""
            }`
          }
        >
          Profile
        </NavLink>
      </div>

       {/* Content Area */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Management;
