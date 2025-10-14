// src/pages/room/RoomEdit.jsx
import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNotification } from "../../context/notification/NotificationProvider";
import RoomCard from "../room/RoomCard";
import AddRoomPopup from "./add_room";

import {
  deleteRoomAPI,
  fetchAllRoomsAPI,
  fetchAllRoomsWithPaginationAPI,
  updateRoomAPI,
} from "../../hooks/roomAPI";
import Overlay from "../Overlay";
import { overlay, popUP } from "../../styles/animation";
import { AnimatePresence } from "motion/react";

const RoomEdit = () => {
  const { createNotification } = useNotification();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeoutReached, setTimeoutReached] = useState(false);

  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadRooms = async () => {
      setLoading(true);
      setTimeoutReached(false);
      setError(null);

      // Set timeout to show timeout message after 10 seconds
      const timeoutId = setTimeout(() => {
        if (mounted) setTimeoutReached(true);
      }, 10000);

      try {
        const response = await fetchAllRoomsAPI();
        if (mounted) {
          setRooms(Array.isArray(response) ? response : response.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        if (mounted) {
          setError("Could not load rooms. Please try again later.");
        }
      } finally {
        clearTimeout(timeoutId);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadRooms();

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (rooms.length === 0) return rooms;
    if (!search) return rooms;
    const q = search.toLowerCase();
    return rooms.filter(
      (r) =>
        String(r.roomId).includes(q) ||
        (r.status ?? "").toLowerCase().includes(q) ||
        (r.forwhich ?? "").toLowerCase().includes(q)
    );
  }, [rooms, search]);

  const openAdd = () => {
    setSelected(null);
    setIsPopupOpen(true);
  };
  const openEdit = (room) => {
    setSelected(room);
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelected(null);
  };

  // Map popup payload -> backend fields
  const mapPayloadToBackend = (p) => ({
    // UI fields: { forwhich, price, maxsize, image }
    // createRoom requires: { capacity, price, petType, picture }
    capacity: p.maxsize ?? p.size, // UI uses maxsize = capacity
    price: p.price,
    petType: p.forwhich, // "small"/"big"
    picture: p.image, // URL or string per your backend
  });

  const handleSaveRoom = async (payload) => {
    try {
      if (selected) {
        // EDIT MODE
        const response = await updateRoomAPI(selected.roomId, payload);
        const updatedRoom = response.data;
        setRooms((prev) =>
          prev.map((item) =>
            item.roomId === updatedRoom.roomId ? updatedRoom : item
          )
        );
        createNotification(
          "success",
          "Room Updated",
          "Room updated successfully."
        );
      } else {
        // ADD MODE - Note: You need to import addRoomAPI
        // const response = await addRoomAPI(payload);
        // const newRoom = response.data;
        // setRooms((prev) => [newRoom, ...prev]);
        createNotification("success", "Room Added", "Room added successfully.");
      }
      closePopup();
    } catch (err) {
      console.error("Failed to save room:", err);
      createNotification("fail", "Save Failed", "Failed to save room.");
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoomAPI(roomId);
      setRooms((prev) => prev.filter((r) => r.roomId !== roomId));
      closePopup();
    } catch (err) {
      console.error("Failed to delete room:", err);
      createNotification("fail", "Delete Failed", "Failed to delete room.");
    }
  };

  if (loading) {
    return (
      <p className="text-2xl w-full text-center mt-32">Loading services...</p>
    );
  }

  if (error) {
    return (
      <p className="text-2xl w-full text-center mt-32 text-red-500">{error}</p>
    );
  }

  return (
    <main className="flex-1">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
        <div className="flex items-center my-8 w-full">
          <div className="flex flex-1 border-2 rounded-4xl px-6 py-4 text-3xl">
            <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center -bottom-1 relative"></i>
            <input
              className="w-full outline-0 placeholder:opacity-75 text-2xl"
              placeholder="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <div className="flex gap-6 ml-8">
            <button
              onClick={openAdd}
              className="px-12 py-4 font-semibold bg-[var(--light-brown-color)] rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-xl w-40 cursor-pointer"
            >
              add
            </button>
          </div>
        </div>
      </div>

      {/* Grid / states */}
      {loading ? (
        timeoutReached ? (
          <p className="text-2xl w-full text-center mt-32 italic text-red-600">
            Server not responding. Please try again later.
          </p>
        ) : (
          <p className="text-2xl w-full text-center mt-32 italic">Loading…</p>
        )
      ) : filtered.length === 0 ? (
        <p className="text-2xl w-full text-center mt-32 italic">No result.</p>
      ) : (
        <div className="px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((r) => (
              <RoomCard
                key={r.roomId}
                data={r}
                compact
                actionLabel="EDIT"
                onClick={() => openEdit(r)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Popup */}
      <AnimatePresence mode="popLayout">
        {isPopupOpen && (
          <>
            <Overlay
              bgColor="black"
              variants={overlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
            <AddRoomPopup
              variants={popUP}
              initial="hidden"
              animate="visible"
              exit="hidden"
              title={selected ? `Edit Room #${selected.roomId}` : "Add room"}
              initialData={selected}
              onClose={closePopup}
              onSave={handleSaveRoom}
              onDelete={(id) => handleDeleteRoom(id)}
            />
          </>
        )}
      </AnimatePresence>

      <Outlet />
    </main>
  );
};

export default RoomEdit;
