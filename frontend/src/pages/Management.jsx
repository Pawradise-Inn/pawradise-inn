import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import ManagementSideBar from "../components/Management/ManagementSideBar";

const Management = () => {
  return (
    <div className="min-h-screen flex">
      <ManagementSideBar />

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
