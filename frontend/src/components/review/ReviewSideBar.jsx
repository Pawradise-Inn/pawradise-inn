import { useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../SideBar";

const ReviewSideBar = ({ badge }) => {
  const location = useLocation();
  const pathList = location.pathname.split("/");
  const link = [
    { text: "To be reviewed", to: "/review", path: "me" },
    {
      text: "History",
      to: "/review/history",
      path: "history",
      badge: badge
    },
  ];
  const [currentPage, setCurrentPage] = useState(
    pathList[2] ? pathList[2] : "me"
  );

  return (
    <SideBar
      link={link}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default ReviewSideBar;
