import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardCard from "../../../components/dashboard/DashboardCard";

// --- API Functions (adjust path as needed) ---
// Change this in: src/pages/staff/dashboard/DashboardTab4.jsx

import {
  getTodayService,
} from "../../../hooks/bookedServiceAPI";

// --- Main Component ---

const DashboardTab4 = () => {
  // Renamed
  // UPDATED: State now starts empty and includes a loading flag.
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await getTodayService();
      setItems(Array.isArray(data.data) ? data.data : []);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  // NEW: useEffect to load data from the API on component mount.
  useEffect(() => {
    fetchServices();
  }, []);

  const filtered = !search
    ? items
    : items.filter((item) =>
        item.serviceName.toLowerCase().includes(search.toLowerCase())
      );

  // Styles (removed hoveredButton state for simplicity as delete logic is moved)
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

  return (
    <main style={mainStyle}>
      <div style={headerStyle}>
        <div className="flex flex-1 border-2 rounded-4xl px-6 py-4 text-3xl">
          <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center -bottom-1 relative"></i>
          <input
            style={inputStyle}
            placeholder="search by service name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>

      {/* UPDATED: Added a loading state indicator */}
      {loading ? (
        <p style={feedbackStyle}>Loading bookings...</p>
      ) : filtered.length === 0 ? (
        <p style={feedbackStyle}>No results found.</p>
      ) : (
        <div style={listContainerStyle}>
          {filtered.map((item) => (
            <DashboardCard
              key={item.bookingId}
              data={item}
              //onClick={() => handleEditClick(item)}
              //onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      <Outlet className="overflow-y-hidden" />
    </main>
  );
};

export default DashboardTab4; // Renamed
