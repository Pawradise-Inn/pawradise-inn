// src/pages/room/RoomEdit.jsx
import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "motion/react";

import { useNotification } from "../../context/notification/NotificationProvider";
import RoomCard from "../room/RoomCard";
import AddRoomPopup from "./add_room";

import {
  deleteRoomAPI,
  fetchAllRoomsWithPaginationAPI,
  updateRoomAPI,
  // addRoomAPI, // uncomment when you want to support Add
} from "../../hooks/roomAPI";
import Overlay from "../Overlay";
import { overlay, popUP } from "../../styles/animation";

const RoomEdit = () => {
  const { createNotification } = useNotification();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeoutReached, setTimeoutReached] = useState(false);

  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // 🔹 Load rooms from API
  useEffect(() => {
    let mounted = true;

    const loadRooms = async () => {
      setLoading(true);
      setTimeoutReached(false);
      setError(null);

      const timeoutId = setTimeout(() => {
        if (mounted) setTimeoutReached(true);
      }, 10000);

      try {
        const result = await fetchAllRoomsWithPaginationAPI();
        // result can be:
        // - the full envelope { success, data, ... }
        // - or already the array, depending on your hook
        console.log("Rooms API result:", result);

        let loadedRooms = [];
        if (Array.isArray(result)) {
          loadedRooms = result;
        } else if (Array.isArray(result.data)) {
          loadedRooms = result.data;
        }

        if (mounted) {
          setRooms(loadedRooms);
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

  // 🔹 Search filter
  const filtered = useMemo(() => {
    if (rooms.length === 0) return rooms;
    if (!search) return rooms;
    const q = search.toLowerCase();

    return rooms.filter((r) => {
      const idStr = String(r.id ?? r.roomId ?? "").toLowerCase();
      const statusStr = String(r.status ?? "").toLowerCase();
      const petTypeStr = String(r.forWhich ?? r.petType ?? "").toLowerCase();
      return (
        idStr.includes(q) || statusStr.includes(q) || petTypeStr.includes(q)
      );
    });
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

  // 🔹 Map popup payload -> backend fields for update
  const mapPayloadToBackend = (p) => ({
    // popup payload: { name, petType, price, capacity, image }
    ...(p.name ? { name: p.name } : {}),
    ...(p.price !== undefined ? { price: p.price } : {}),
    ...(p.capacity !== undefined ? { capacity: p.capacity } : {}),
    ...(p.petType ? { petType: p.petType } : {}),
    ...(p.image ? { picture: p.image } : {}),
  });

  const reloadRooms = async () => {
    try {
      const result = await fetchAllRoomsWithPaginationAPI();
      let loadedRooms = [];
      if (Array.isArray(result)) {
        loadedRooms = result;
      } else if (Array.isArray(result.data)) {
        loadedRooms = result.data;
      }
      setRooms(loadedRooms);
    } catch (err) {
      console.error("Failed to reload rooms:", err);
    }
  };

  const handleSaveRoom = async (payload) => {
    try {
      const id = selected?.id ?? selected?.roomId;

      if (id) {
        // 🔧 EDIT MODE
        const backendPayload = mapPayloadToBackend(payload);
        console.log("Updating room", id, "with", backendPayload);

        await updateRoomAPI(id, backendPayload);
        createNotification("success", "Room updated", "Room has been updated.");

        await reloadRooms();
      } else {
        // 🆕 ADD MODE (if you want to support creating rooms from here)
        // const createPayload = {
        //   name: payload.name,
        //   capacity: payload.capacity,
        //   price: payload.price,
        //   type: payload.petType,      // backend createRoom expects "type"
        //   picture: payload.image,
        // };
        // await addRoomAPI(createPayload);
        // createNotification("success", "Room added", "New room has been created.");
        createNotification(
          "warning",
          "Add not implemented",
          "Add mode is not wired to backend yet."
        );
      }

      closePopup();
    } catch (err) {
      console.error("Failed to save room:", err);
      console.error("Backend response:", err.response?.data);
      createNotification(
        "fail",
        "Failed to save room",
        err.response?.data?.message || "Server error. Please check backend logs."
      );
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoomAPI(roomId);
      setRooms((prev) => prev.filter((r) => (r.id ?? r.roomId) !== roomId));
      createNotification("success", "Room deleted", "Room has been deleted.");
      closePopup();
    } catch (err) {
      console.error("Failed to delete room:", err);
      createNotification(
        "fail",
        "Failed to delete room",
        err.response?.data?.message || "Could not delete room."
      );
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
      {filtered.length === 0 ? (
        <p className="text-2xl w-full text-center mt-32 italic">No result.</p>
      ) : (
        <div className="px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((r) => (
              <RoomCard
                key={r.id ?? r.roomId}
                data={r}
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
          <div>
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
              title={
                selected
                  ? `Edit Room #${selected.id ?? selected.roomId}`
                  : "Add room"
              }
              initialData={selected}
              onClose={closePopup}
              onSave={handleSaveRoom}
              onDelete={(id) => handleDeleteRoom(id)}
            />
          </div>
        )}
      </AnimatePresence>

      <Outlet className="overflow-y-hidden" />
    </main>
  );
};

export default RoomEdit;
