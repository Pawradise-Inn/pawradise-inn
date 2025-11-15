import { useEffect, useState } from "react";
import DashboardCard from "../../../components/dashboard/Room_dashboardCard";
import { getTodayRoom } from "../../../hooks/bookedRoomAPI";
import { Outlet } from "react-router-dom";


const DashboardTab2 = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    useEffect(() => {
      const loadRooms = async () => {
        try {
          setLoading(true);
          const response = await getTodayRoom();
          // Ensure we're setting an array, even if empty
          console.log(response);
          setItems(Array.isArray(response?.data) ? response.data : []);
        } catch (error) {
          console.error("Failed to fetch checkin:", error);
          setItems([]); // Set empty array on error
        } finally {
          setLoading(false);
        }
      };
      loadRooms();
    }, []);
//    want to search 
      const filtered = !search
    ? items || []
    : (items || []).filter((item) =>
        item?.petName.toLowerCase().includes(search.toLowerCase())
      );
  const mainStyle = { flex: 1 };
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    margin: "2rem 0",
    width: "100%",
    padding: "0 2rem",
  };
  const inputStyle = { width: "100%", outline: 0, fontSize: "1.25rem" };
  const listContainerStyle = { padding: "0 2rem", marginTop: "2rem" };
  const feedbackStyle = {
    fontSize: "1.25rem",
    width: "100%",
    textAlign: "center",
    marginTop: "8rem",
    fontStyle: "italic",
  };

  const [checkIn, setCheckIn] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckIn = async () => {
      try {
        const response = await getTodayRoom();
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
    <main style={mainStyle}>
      {" "}
      <div style={headerStyle}>
        {" "}
        <div className="flex flex-1 border-2 rounded-4xl px-6 py-4 text-3xl">
          {" "}
          <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center -bottom-1 relative"></i>{" "}
          <input
            style={inputStyle}
            placeholder="search by pet name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />{" "}
        </div>{" "}
      </div>{" "}
      {loading ? (
        <p style={feedbackStyle}>Loading bookings...</p>
      ) : !Array.isArray(filtered) || filtered.length === 0 ? (
        <p style={feedbackStyle}>No results found.</p>
      ) : (
        <div style={listContainerStyle}>
          {" "}
          {filtered.map((item) => (
            <DashboardCard
              key={item.id}
              data={item}
            />
          ))}{" "}
        </div>
      )}
      <Outlet className="overflow-y-hidden" />{" "}
    </main>
  );
};

export default DashboardTab2;
