import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { fetchCustomerAPI } from "../../hooks/customerAPI";
import { motion } from "motion/react";
import { startUpVariants } from "../../styles/animation";

const Profile = () => {
  const link = [
    { text: "My Profile", to: "/profile" },
    { text: "My Booking", to: "/profile/booking" },
    { text: "My Pet", to: "/profile/pet" },
  ];
  const [user, setUser] = useState(null);
  const MotionNavLink = motion(NavLink);

  const fetchData = async () => {
    try {
      const response = await fetchCustomerAPI(1);
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="text-center w-60 p-4 flex flex-col space-y-16 font-semibold mr-10 mt-10 mb-10 border-r border-gray-300 ">
        {link.map((data, idx) => {
          return (
            <MotionNavLink
              key={idx}
              variants={startUpVariants}
              initial="hidden"
              animate="firstRender"
              custom={idx + 1}
              to={data.to}
              className={({ isActive }) =>
                `px-4 py-4 rounded ${
                  isActive
                    ? "bg-[var(--dark-brown-color)] font-bold !text-white"
                    : ""
                }`
              }
              end
            >
              {data.text}
            </MotionNavLink>
          );
        })}
      </div>

      {/* Content Area */}
      <motion.div
        variants={startUpVariants}
        initial="hidden"
        animate="firstRender"
        custom={0}
        className="flex-1 p-6"
      >
        <Outlet context={{ user, setUser }} />
      </motion.div>
    </div>
  );
};

export default Profile;
