import { useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../SideBar";

const ProfileSideBar = () => {
  const location = useLocation();
  const pathList = location.pathname.split("/");
  const link = [
    { text: "My Profile", to: "/profile", path: "me" },
    { text: "My Booking", to: "/profile/booking", path: "booking" },
    { text: "My Pet", to: "/profile/pet", path: "pet" },
  ];
  const [currentPage, setCurrentPage] = useState(pathList[2] || "me");

  return (
    <SideBar link={link} currentPage={currentPage} setCurrentPage={setCurrentPage} showLogout={true}/>
  );
};

export default ProfileSideBar;
