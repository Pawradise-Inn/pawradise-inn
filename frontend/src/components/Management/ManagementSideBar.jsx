import { useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../SideBar";

const ManagementSideBar = () => {
  const location = useLocation();
  const pathList = location.pathname.split("/");

  const link = [
    { text: "Service", to: "/staff/management", path: "me" },
    { text: "Room", to: "/staff/management/room", path: "room" },
    { text: "Payment", to: "/staff/management/payment", path: "payment" },
    { text: "Profile", to: "/staff/management/profile", path: "profile" },
  ];

  const [currentPage, setCurrentPage] = useState(pathList[3] || "me");
  return (
    <SideBar
      link={link}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      showLogout={true}
    />
  );
};

export default ManagementSideBar;
