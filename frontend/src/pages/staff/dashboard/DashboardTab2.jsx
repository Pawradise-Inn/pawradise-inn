import { useEffect, useState } from "react";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { getTodayRoom } from "../../../hooks/bookedRoomAPI";

const DashboardTab2 = () => {
  const [checkIn, setCheckIn] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckIn = async () => {
      try {
        const response = await getTodayRoom();
        console.log(response.data);
        setCheckIn(response);
      } catch(err) {
        console.error("Failed to fetch check-ins:", err);
        setError("Could not load check-in data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCheckIn();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center mt-16 text-lg">
        Loading today's check-ins...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-16 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-5xl">
      {checkIn.length > 0 ? (
        checkIn.map((booking) => (
          <DashboardCard
            key={booking.id}
            data={booking}
            onClick={() => handleCardClick(booking.id)}
          />
        ))
      ) : (
        <p className="text-center mt-16 text-lg text-gray-500">
          There are no check-ins scheduled for today.
        </p>
      )}
    </div>
  );
};

export default DashboardTab2;
