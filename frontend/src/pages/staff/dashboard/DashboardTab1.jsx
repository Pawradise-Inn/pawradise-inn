import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
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

// --- Helper Components ---

/**
 * MODIFIED: The DashboardCard is now for display only and includes a delete button.
 * The status dropdown and the main click handler for editing have been removed.
 */
const DashboardCard = ({ data, onDelete }) => {
  const cardStyle = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    width: "100%",
    marginBottom: "1rem",
  };
  const imagePlaceholderStyle = {
    width: "80px",
    height: "80px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    marginRight: "16px",
    flexShrink: 0,
  };
  const textContainerStyle = { textAlign: "left", flexGrow: 1 };
  const nameStyle = { margin: "0", fontSize: "1.2rem", fontWeight: "bold" };
  const detailStyle = { margin: "4px 0 0", color: "#666" };
  const deleteButtonStyle = {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
    marginLeft: "1rem",
  };

  return (
    <div style={cardStyle}>
      <div style={imagePlaceholderStyle}></div>{" "}
      <div style={textContainerStyle}>
        <p style={nameStyle}>{data.name}</p>{" "}
        <p style={detailStyle}>{data.petName}</p>{" "}
        <p style={detailStyle}>{data.timeBooked}</p>{" "}
      </div>{" "}
      <button onClick={onDelete} style={deleteButtonStyle}>
        Delete
      </button>{" "}
    </div>
  );
};

/**
 * MODIFIED: The ItemPopup is now only for adding new items.
 * Edit and delete functionalities have been removed from the popup.
 */
const ItemPopup = ({ onClose, onSave, ...motionProps }) => {
  const [name, setName] = useState("");
  const [petName, setPetName] = useState("");
  const [timeBooked, setTimeBooked] = useState("");

  const handleSave = () => {
    onSave({
      name: name || "New Room Booking",
      petName: petName || "Pet's Name",
      timeBooked: timeBooked || "Scheduled Time",
    });
  };
  // Converted to Tailwind classes below
  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    marginTop: "1rem",
  };
  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    cursor: "pointer",
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-lg w-[90%] max-w-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      onClick={(e) => e.stopPropagation()}
      {...motionProps}
    >
      <h2>Add New Booking</h2>{" "}
      <input
        type="text"
        placeholder="Enter room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />{" "}
      <input
        type="text"
        placeholder="Enter pet name"
        value={petName}
        onChange={(e) => setPetName(e.target.value)}
        style={inputStyle}
      />{" "}
      <input
        type="text"
        placeholder="Enter time"
        value={timeBooked}
        onChange={(e) => setTimeBooked(e.target.value)}
        style={inputStyle}
      />{" "}
      <div style={buttonContainerStyle}>
        {" "}
        <button onClick={onClose} style={buttonStyle}>
          Cancel
        </button>{" "}
        <button
          onClick={handleSave}
          style={{
            ...buttonStyle,
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
          }}
        >
          Save
        </button>{" "}
      </div>{" "}
    </motion.div>
  );
};

// --- Main Component ---

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
