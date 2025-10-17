import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardCard from "../../../components/dashboard/DashboardCard";
// --- API Functions (adjust path as needed) ---
// Now using the new bookedRoomAPI functions
import {
  createBookedRoom,
  deleteBookedRoom,
  getTodayRoom,
} from "../../../hooks/bookedRoomAPI";
import Overlay from "../../../components/Overlay";
import { overlay, popUP } from "../../../styles/animation";
import { AnimatePresence, motion } from "motion/react";



const DashboardTab1 = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Removed editingItem state // Fetch rooms on component mount
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const response = await getTodayRoom();
        // Ensure we're setting an array, even if empty
        console.log(response);
        setItems(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setItems([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  const filtered = !search
    ? items || []
    : (items || []).filter((item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
      );

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  }; // Simplified to only handle adding a new item
  const handleSaveItem = async (itemFromPopup) => {
    const { createNotification } = useNotification();
    try {
      const newItem = await createBookedRoom({
        ...itemFromPopup,
        status: "pending",
      });
      setItems((prev) => [newItem, ...prev]);
      handleClosePopup();
      createNotification("success", "Saving Item", "Item saved successfully");
    } catch (error) {
      console.error("Failed to save item:", error);
    }
  }; // Handles deleting a booking from the card
  const handleDeleteItem = async (id) => {
    // Optional: Add a confirmation dialog before deleting
    // if (!window.confirm("Are you sure you want to delete this booking?")) {
    //  return;
    // }
    try {
      await deleteBookedRoom(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  const handleAddClick = () => {
    setIsPopupOpen(true);
  }; // --- Styles ---

  const mainStyle = { flex: 1 };
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    margin: "2rem 0",
    width: "100%",
    padding: "0 2rem",
  };
  const inputStyle = { width: "100%", outline: 0, fontSize: "1.25rem" };
  const buttonGroupStyle = {
    display: "flex",
    gap: "1.5rem",
    marginLeft: "2rem",
  };
  const buttonStyle = {
    padding: "1rem 2rem",
    fontWeight: 600,
    backgroundColor: "#D2B48C",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    width: "140px",
    transition: "transform 0.2s ease-in-out",
  };
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
      {" "}
      <div style={headerStyle}>
        {" "}
        <div className="flex flex-1 border-2 rounded-4xl px-6 py-4 text-3xl">
          {" "}
          <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center -bottom-1 relative"></i>{" "}
          <input
            style={inputStyle}
            placeholder="search by room name"
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
              onDelete={() => handleDeleteItem(item.id)}
            />
          ))}{" "}
        </div>
      )}{" "}
      <AnimatePresence mode="popLayout">
        {isPopupOpen && (
          <div>
            <Overlay
              variants={overlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
              bgColor="black"
              onClick={handleClosePopup}
            />
            <ItemPopup
              variants={popUP}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClose={handleClosePopup}
              onSave={handleSaveItem}
            />
          </div>
        )}
      </AnimatePresence>
      <Outlet className="overflow-y-hidden" />{" "}
    </main>
  );
};

export default DashboardTab1;
