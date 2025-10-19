import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { useState ,useEffect } from "react";
import { getTodayRoom } from "../../../hooks/bookedRoomAPI";
import { getTodayService } from "../../../hooks/bookedServiceAPI";
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [counts, setCounts] = useState({
    rooms: 0,
    checkIn: 0,
    checkOut: 0,
    services: 0,
  });
  const [loading, setLoading] = useState(true);

  // --- This is the main change ---
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        const [
          roomResponse,
          serviceResponse,
        ] = await Promise.all([
          getTodayRoom(),
          getTodayService(),
        ]);

        // Put the data into a single state object
        const allData = {
          roomBookings: Array.isArray(roomResponse?.data) ? roomResponse.data : [],
          // checkIn: Array.isArray(checkInResponse?.data) ? checkInResponse.data : [],
          // checkOut: Array.isArray(checkOutResponse?.data) ? checkOutResponse.data : [],
          serviceBookings: Array.isArray(serviceResponse?.data) ? serviceResponse.data : [],
        };
        
        setData(allData);

        // Set the counts for the navbar
        setCounts({
          rooms: allData.roomBookings.length,
          // checkIn: allData.checkIn.length,
          // checkOut: allData.checkOut.length,
          services: allData.serviceBookings.length,
        });

      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setData({ roomBookings: [], checkIn: [], checkOut: [], serviceBookings: [] });
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);
  return (
    <div className="flex flex-col items-center mt-16 px-4 sm:px-8">
      <h2 className="w-full text-5xl font-extrabold mb-8 text-center">
        Dashboard
      </h2>

      {/* Centered Tabs Wrapper */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="flex justify-center overflow-x-auto space-x-4 pb-2">
          {/* NavLink for Today's Booking */}
          <Navbar
            pages={[
              "Room Bookings",
              "Check In",
              "Check Out",
              "Service Bookings",
            ]}
            paths={["", "check-in", "check-out", "service-booked"]}
            counts={[counts.rooms,counts.rooms,counts.rooms,counts.services]}
            pathIdxHighlight={3}
            prevPath="/staff/dashboard"
            mainStyle="flex-shrink-0 px-12 py-6 rounded-xl transition-all duration-300
               text-base sm:text-lg md:text-2xl font-semibold"
            element="dashboard-nav"
          />
        </div>

        {/* Extended Underline */}
        <div
          className="absolute bottom-0 h-[2px] bg-gray-700"
          style={{
            width: "120%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Content Area */}
      <div className="w-full flex justify-center mt-8 px-2 sm:px-0 overflow-y-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
