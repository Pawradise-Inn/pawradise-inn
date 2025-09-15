// src/pages/room/RoomEdit.jsx
import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import RoomCard from "../room/RoomCard";
import AddRoomPopup from "./add_room";

import {
  fetchAllRoomsWithReviewsAPI,
  addRoomAPI,
  updateRoomAPI,
  deleteRoomAPI,
} from "../../hooks/roomAPI";

const RoomEdit = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setTimeoutReached(true), 15000);
    return () => clearTimeout(t);
  }, [loading]);

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

  const filtered = useMemo(() => {
    if (!search) return rooms;
    const q = search.toLowerCase();
    return rooms.filter(
      (r) =>
        String(r.roomId).includes(q) ||
        (r.status ?? "").toLowerCase().includes(q) ||
        (r.forwhich ?? "").toLowerCase().includes(q)
    );
  }, [rooms, search]);

  const openAdd = () => { setSelected(null); setIsPopupOpen(true); };
  const openEdit = (room) => { setSelected(room); setIsPopupOpen(true); };
  const closePopup = () => { setIsPopupOpen(false); setSelected(null); };

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
    if (selected) {
      // EDIT: your backend only allows { price, petType } in PATCH
      const update = {
        price: payload.price,
        petType: payload.forwhich,
        // capacity/picture NOT supported by your updateRoom controller
      };
      await updateRoomAPI(selected.roomId, update);

      // Optimistic local update
      setRooms((prev) =>
        prev.map((it) =>
          it.roomId === selected.roomId
            ? { ...it, price: update.price, forwhich: update.petType }
            : it
        )
      );
    } else {
      // ADD
      const body = mapPayloadToBackend(payload);
      const created = await addRoomAPI(body);
      const newRoom = {
        image: created.picture,
        roomId: created.id,
        review: 5,                          // default if you want
        forwhich: created.petType,
        price: created.price,
        size: created.capacity,
        maxsize: created.capacity,
      };
      setRooms((prev) => [newRoom, ...prev]);
    }
    closePopup();
  };

  const handleDeleteRoom = async (roomId) => {
    await deleteRoomAPI(roomId);
    setRooms((prev) => prev.filter((r) => r.roomId !== roomId));
    closePopup();
  };

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
              className="px-12 py-4 font-semibold bg-[var(--light-brown-color)] rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-xl w-40"
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
