import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import { useAuth } from "../../context/AuthProvider";

const Profile = () => {
  const {user, setUser} = useAuth();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ProfileSideBar />
      </motion.div>

      {/* Content Area */}
      <motion.div 
        className="flex-1 p-6"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <Outlet context={{ user, setUser }} />
      </motion.div>
    </div>
  );
};

export default Profile;
