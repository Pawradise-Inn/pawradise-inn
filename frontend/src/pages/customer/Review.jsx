import { Outlet } from "react-router-dom";
import ReviewSideBar from "../../components/review/ReviewSideBar";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useMemo, useState } from "react";
import {
  getChatLogAndReplyAPI,
  getToBeReviewAPI,
} from "../../hooks/chatlogAPI";

const Review = () => {
  const { user } = useAuth();
  const [historys, setHistorys] = useState([]);
  const [room, setRoom] = useState([]);
  const [service, setService] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          getChatLogAndReplyAPI(),
          getToBeReviewAPI(),
        ]);

        setHistorys(response1.data);
        setRoom(response2.data.rooms);
        setService(response2.data.services);
      } catch (error) {
        console.error("Failed to fetch both API calls:", error);
      }
    };

    fetchData();
  }, [user]);

  const badge = useMemo(() => {
    return historys.filter((history) => !history.readingStatus).length;
  }, [historys]);

  return (
    <div>
      <h1 className="text-4xl font-bold mx-6 mt-6">Pawradise/Review</h1>
      <div className="min-h-screen flex overflow-y-hidden">
        <ReviewSideBar badge={badge} />
        <Outlet
          context={{
            user,
            historys,
            setHistorys,
            room,
            setRoom,
            service,
            setService,
          }}
        />
      </div>
    </div>
  );
};

export default Review;
