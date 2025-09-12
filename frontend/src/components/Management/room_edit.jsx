import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import RoomCard from "../room/RoomCard";      // your existing card
import AddRoomPopup from "./add_room";        // popup component below
import testImg from "../../assets/test.png";  // make sure this exists

// Demo data (replace with API later)
const demoData = [
  { image: testImg, status: "full",      roomId: 1, review: 4.5, forwhich: "small", price: 2000, size: 10, maxsize: 20, pageAmount: 30 },
  { image: testImg, status: "full",      roomId: 2, review: 4.0, forwhich: "big",   price: 1500, size: 5,  maxsize: 10, pageAmount: 10 },
  { image: testImg, status: "full",      roomId: 3, review: 4.8, forwhich: "small", price: 3000, size: 2,  maxsize: 5,  pageAmount: 2  },
  { image: testImg, status: "full",      roomId: 4, review: 4.2, forwhich: "big",   price: 500,  size: 8,  maxsize: 15, pageAmount: 35 },
  { image: testImg, status: "full",      roomId: 5, review: 4.7, forwhich: "small", price: 2500, size: 1,  maxsize: 3,  pageAmount: 50 },
  { image: testImg, status: "available", roomId: 6, review: 4.3, forwhich: "big",   price: 1800, size: 12, maxsize: 20, pageAmount: 100 },
];

const RoomEdit = () => {
  const [rooms, setRooms] = useState(demoData);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selected, setSelected] = useState(null); 

  const filtered = useMemo(() => {
    if (!search) return rooms;
    const q = search.toLowerCase();
    return rooms.filter((r) =>
      String(r.roomId).includes(q) ||
      r.status.toLowerCase().includes(q) ||
      r.forwhich.toLowerCase().includes(q)
    );
  }, [rooms, search]);

  const openAdd  = () => { setSelected(null); setIsPopupOpen(true); };
  const openEdit = (room) => { setSelected(room); setIsPopupOpen(true); };
  const closePopup = () => { setIsPopupOpen(false); setSelected(null); };

  // Save (add & edit)
  const handleSaveRoom = (payload) => {
    if (selected) {
      // EDIT
      setRooms(prev =>
        prev.map(it => it.roomId === selected.roomId ? { ...it, ...payload } : it)
      );
    } else {
      // ADD
      const nextId = rooms.length ? Math.max(...rooms.map(r => r.roomId)) + 1 : 1;
      const newItem = {
        roomId: nextId,
        review: 0.0,
        pageAmount: 1,
        image: payload.image || testImg,
        ...payload, // { status, forwhich, price, size, maxsize }
      };
      setRooms(prev => [newItem, ...prev]);
    }
    closePopup();
  };

  const handleDeleteRoom = (roomId) => {
    setRooms(prev => prev.filter(r => r.roomId !== roomId));
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

      {/* Grid → 2 columns on ≥640px, 1 column on tiny screens */}
      {filtered.length === 0 ? (
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
                    onClick={(room) => openEdit(room)}
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
