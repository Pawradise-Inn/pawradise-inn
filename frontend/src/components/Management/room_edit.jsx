// src/pages/room/RoomEdit.jsx
import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import RoomCard from "../room/RoomCard";
import AddRoomPopup from "./add_room";

import {
  fetchAllRoomsAPI,
  fetchAllRoomsWithReviewsAPI,
  addRoomAPI,
  updateRoomAPI,
  deleteRoomAPI,
} from "../../hooks/roomAPI";

const RoomEdit = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await fetchAllRoomsAPI();
        setRooms(response.data);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        setError("Could not load Rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return rooms;
    const q = search.toLowerCase();
    return rooms.filter(
      (r) => String(r.roomId).includes(q) ||
      (r.status ?? "").toLowerCase().includes(q) ||
      (r.forwhich ?? "").toLowerCase().includes(q)
    );
  }, [rooms, search]);

  const openAdd = () => { setSelected(null); setIsPopupOpen(true); };
  const openEdit = (room) => { setSelected(room); setIsPopupOpen(true); };
  const closePopup = () => { setIsPopupOpen(false); setSelected(null); };


  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setTimeoutReached(false);
      try {
        const list = await fetchAllRoomsWithReviewsAPI(); // ⬅️ use /reviews
        if (mounted) setRooms(Array.isArray(list) ? list : []);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Map popup payload -> backend fields
  const mapPayloadToBackend = (p) => ({
    // UI fields: { forwhich, price, maxsize, image }
    // createRoom requires: { capacity, price, petType, picture }
    capacity: p.maxsize ?? p.size,   // UI uses maxsize = capacity
    price: p.price,
    petType: p.forwhich,             // "small"/"big"
    picture: p.image,                // URL or string per your backend
  });

  const handleSaveRoom = async (payload) => {
    try {
      if (selected) {
        // EDIT MODE
        const response = await updateRoomAPI(selected.id, payload);
        const updatedRoom = response.data;
        setServices((prev) =>
          prev.map((item) =>
            item.id === updatedRoom.id ? updatedRooom : item
          )
        );
      } else {
        // ADD MODE
        const response = await addServiceAPI(payload);
        const newService = response.data;
        setServices((prev) => [newService, ...prev]);
      }
      closePopup();
    } catch (err) {
      console.error("Failed to save service:", err);
      alert("Failed to save service.");

}
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoomAPI(roomId);
      setRooms((prev) => prev.filter((r) => r.roomId !== roomId));
      closePopup();
    } catch (err) {
      console.error("Failed to delete room:", err);
      alert("Failed to delete room.");
    }
  };

  if (loading) {
    return <p className="text-2xl w-full text-center mt-32">Loading services...</p>;
  }

  if (error) {
    return <p className="text-2xl w-full text-center mt-32 text-red-500">{error}</p>;
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
              className="px-12 py-4 font-semibold bg-(--light-brown-color) rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-xl w-40"
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
      {isPopupOpen && (
        <AddRoomPopup
          title={selected ? `Edit Room #${selected.roomId}` : "Add room"}
          initialData={selected}
          onClose={closePopup}
          onSave={handleSaveRoom}
          onDelete={(id) => handleDeleteRoom(id)}
        />
      )}

      <Outlet />
    </main>
  );
};

export default RoomEdit;
