import { Outlet } from "react-router-dom";
import ReviewSideBar from "../../components/review/ReviewSideBar";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";
import { getChatLogAndReplyAPI } from "../../hooks/chatlogAPI";

const Review = () => {
  const { user } = useAuth();
  const [badge, setBadge] = useState(0);
  const [historys, setHistorys] = useState([]);

  useEffect(() => {
    if (!user) return;
    getChatLogAndReplyAPI().then((data) => {
      setHistorys(data.data);
    });
  }, [user]);

  useEffect(() => {
    let badgeCount = 0;
    historys.forEach((history) => {
      if (!history.readingStatus) {
        badgeCount++;
      }
    });
    setBadge(badgeCount);
  }, [historys]);

  return (
    <div>
      <h1 className="text-4xl font-bold mx-6 mt-6">Pawradise/Review</h1>
      <div className="min-h-screen flex overflow-y-hidden">
        <ReviewSideBar badge={badge} />
        <Outlet context={{ user, historys, setHistorys }} />
      </div>
    </div>
  );
};

export default Review;
