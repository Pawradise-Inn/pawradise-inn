import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import ServiceCard from "../service/ServiceCard"; // keep this path
import AddServicePopup from "./add_service";
import testImg from "../../assets/test.png"; // ensure this exists

// Demo data (replace with API later). Keep stable ids.
const demoData = [
  { id: 1, image: testImg, name: "Boarding",  review: 4.5, petType: "small", price: 2000, pageAmount: 3 },
  { id: 2, image: testImg, name: "Grooming",  review: 4.0, petType: "big",   price: 1500, pageAmount: 4 },
  { id: 3, image: testImg, name: "Training",  review: 4.8, petType: "small", price: 3000, pageAmount: 5 },
  { id: 4, image: testImg, name: "Walking",   review: 4.2, petType: "big",   price: 500,  pageAmount: 13 },
  { id: 5, image: testImg, name: "Vet Visit", review: 4.7, petType: "small", price: 2500, pageAmount: 13 },
  { id: 6, image: testImg, name: "Daycare",   review: 4.3, petType: "big",   price: 1800, pageAmount: 1 },
];

const ServiceEdit = () => {
  const [services, setServices] = useState(demoData);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selected, setSelected] = useState(null); // null = add mode, object = edit mode

  const filtered = useMemo(() => {
    if (!search) return services;
    const q = search.toLowerCase();
    return services.filter((s) => s.name.toLowerCase().includes(q));
  }, [services, search]);

  const openAdd = () => {
    setSelected(null);
    setIsPopupOpen(true);
  };

  const openEdit = (svc) => {
    setSelected(svc);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelected(null);
  };

  // Save handler works for both add & edit
  const handleSaveService = (payload) => {
    if (selected) {
      // EDIT
      setServices((prev) =>
        prev.map((item) =>
          item.id === selected.id ? { ...item, ...payload } : item
        )
      );
    } else {
      // ADD
      const newItem = {
        id: Date.now(),
        review: 0.0,
        pageAmount: 1,
        image: payload.image || testImg,
        ...payload, // { name, petType, price }
      };
      setServices((prev) => [newItem, ...prev]);
    }
    closePopup();
  };

  const handleDeleteService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    closePopup();
  };

  return (
    <main className="flex-1">
      {/* Top bar */}
      <div className="flex items-center my-8 w-full px-8">
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

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-2xl w-full text-center mt-32 italic">No result.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
          {filtered.map((s) => (
            <ServiceCard
              key={s.id}
              data={{ image: s.image, name: s.name, review: s.review }}
              onClick={() => openEdit(s)}
            />
          ))}
        </div>
      )}

      {/* Popup */}
      {isPopupOpen && (
        <AddServicePopup
          title={selected ? "Edit service" : "Add service"}
          initialData={selected}
          onClose={closePopup}
          onSave={handleSaveService}
          onDelete={(id) => handleDeleteService(id)}
        />
      )}

      <Outlet />
    </main>
  );
};

export default ServiceEdit;
