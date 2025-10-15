import { Outlet } from "react-router-dom";
import ReviewSideBar from "../../components/review/ReviewSideBar";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";

const Review = () => {
  const { user } = useAuth();
  const [badge, setBadge] = useState(0);
  const [historys, setHistorys] = useState([
    {
      id: 19,
      img: "test.png",
      name: "Premium oming Service",
      petName: "Buddy",
      date: "2024-01-15",
      staffName: "Sarah Johnson",
      staffReply: "Dr. Amanda Smith",
      status: true,
      type: "Service",
      rating: 5,
      review: "Excellent service! My pet was well taken care of and the staff was very professional.",
    },
    {
      id: 20,
      img: "test.png",
      name: "Deluxe Pet Suite",
      petName: "Luna",
      date: "2024-01-10",
      staffName: "Mike Chen",
      staffReply: "Jennifer Lee",
      status: true,
      type: "Room",
      rating: 4,
      review: "Great room with comfortable amenities. Luna seemed very happy during her stay.",
    },
    {
      id: 21,
      img: "test.png",
      name: "Basic Health Checkup",
      petName: "Max",
      date: "2024-01-08",
      staffName: "Dr. Emily Rodriguez",
      staffReply: "Dr. Robert Kim",
      status: true,
      type: "Service",
      rating: 5,
      review: "Thorough checkup and the vet explained everything clearly. Highly recommend!",
    },
    {
      id: 22,
      img: "test.png",
      name: "Standard Room",
      petName: "Bella",
      date: "2024-01-05",
      staffName: "Tom Wilson",
      staffReply: "Maria Garcia",
      status: true,
      type: "Room",
      rating: 3,
      review: "Good basic room, but could use some improvements in cleanliness.",
    },
    {
      id: 23,
      img: "test.png",
      name: "Dental Cleaning Service",
      petName: "Charlie",
      date: "2024-01-03",
      staffName: "Lisa Park",
      staffReply: "Dr. Kevin Brown",
      status: false,
      type: "Service",
      rating: 0,
      review: "",
    },
  ]);


  useEffect(() => {
    let badgeCount = 0;
    historys.forEach((history) => {
      if (history.status) {
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
