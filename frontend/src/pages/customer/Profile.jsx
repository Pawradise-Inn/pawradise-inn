  import { useEffect, useState } from "react";
  import { NavLink, Outlet } from "react-router-dom";
  import { fetchUserAPI } from "../../hooks/userAPI";

  const Profile = () => {
    const [user, setUser] = useState(null)

    const fetchData = async () => {
      try{
        const response = await fetchUserAPI(1);
        setUser(response);
      } catch (err){
        console.error(err);
      }
    }

    useEffect(() => {
      fetchData();
    }, [])
    return (  
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="text-center w-60 p-4 flex flex-col space-y-16 font-semibold mr-10 mt-10 mb-10 border-r border-gray-300 ">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `px-4 py-4 rounded transition-all duration-300 ease-in-out ${
                isActive ? "bg-[var(--dark-brown-color)] font-bold !text-white" : ""
              }`
            }
            end
          >
            My Profile
          </NavLink>

          <NavLink
            to="/profile/booking"
            className={({ isActive }) =>
              `px-4 py-4 rounded transition-all duration-300 ease-in-out ${
                isActive ? "bg-[var(--dark-brown-color)] font-bold !text-white" : ""
              }`
            }
          >
            My Booking
          </NavLink>

          <NavLink
            to="/profile/pet"
            className={({ isActive }) =>
              `px-4 py-4 rounded transition-all duration-300 ease-in-out ${
                isActive ? "bg-[var(--dark-brown-color)] font-bold !text-white" : ""
              }`
            }
          >
            My Pet
          </NavLink>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <Outlet context={{user, setUser}}/>
        </div>
      </div>
    );
  };

  export default Profile;
