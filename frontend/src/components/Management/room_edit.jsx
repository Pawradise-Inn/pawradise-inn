import { Outlet } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import RoomCard from "../room/RoomCard";
import AddRoomPopup from "./add_room";
import testImg from "../../assets/test.png";

import {
  fetchAllRoomsAPI,
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
        const data = await fetchAllRoomsAPI();

        const normalized = (Array.isArray(data) ? data : []).map((r) => ({
          roomId: r.roomId ?? r.id,
          status: r.status,
          forwhich: r.forwhich ?? r.type,
          price: r.price,
          size: r.size,
          maxsize: r.maxsize ?? r.capacity,
          review: r.review ?? 0,
          pageAmount: r.pageAmount ?? 1,
          image: r.image ?? testImg,
          ...r,
        }));

        if (mounted) setRooms(normalized);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
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

  // add / edit
  const handleSaveRoom = async (payload) => {
    if (selected) {
      const id = selected.roomId;
      await updateRoomAPI(id, payload);
      setRooms((prev) => prev.map((it) => (it.roomId === id ? { ...it, ...payload } : it)));
    } else {
      const created = await addRoomAPI(payload);
      const newRoom = {
        roomId: created.roomId ?? created.id,
        review: created.review ?? 0,
        pageAmount: created.pageAmount ?? 1,
        image: created.image ?? payload.image ?? testImg,
        status: created.status ?? payload.status,
        forwhich: created.forwhich ?? created.type ?? payload.forwhich,
        price: created.price ?? payload.price,
        size: created.size ?? payload.size,
        maxsize: created.maxsize ?? created.capacity ?? payload.maxsize,
        ...created,
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
