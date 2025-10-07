import { NavLink, Outlet } from "react-router-dom";
import { motion } from "motion/react";
import { startUpVariants } from "../styles/animation";

const Management = () => {
  const navItems = [
    { to: "/staff/management", label: "Service", end: true },
    { to: "/staff/management/room", label: "Room", end: true },
    { to: "/staff/management/payment", label: "Payment", end: false },
    { to: "/staff/management/profile", label: "Profile", end: false }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.div 
        className="text-center w-60 p-4 flex flex-col space-y-16 font-semibold mr-10 mt-10 mb-10 border-r border-gray-300"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.to}
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-4 rounded transition-all duration-300 ease-in-out hover:scale-105 ${
                  isActive
                    ? "bg-[var(--dark-brown-color)] font-bold !text-white"
                    : "hover:bg-[var(--light-brown-color)] hover:shadow-md"
                }`
              }
              end={item.end}
            >
              {item.label}
            </NavLink>
          </motion.div>
        ))}
      </motion.div>

      {/* Content Area */}
      <motion.div 
        className="flex-1 p-6"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Management;
