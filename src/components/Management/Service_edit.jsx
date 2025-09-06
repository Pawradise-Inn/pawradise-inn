import { Outlet } from "react-router-dom";
import { useState } from "react";
import ServiceCard from "../ServiceCard";
import AddServicePopup from "./add_service";

const mockServices = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  name: "service_name",
  review: "x.x/5.0(star)",
  image: "",
}));

const ServiceEdit = () => {
  const [services, setServices] = useState(mockServices);
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

    {/* Use your ServiceCard component */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
      {mockServices.map((s) => (
        <ServiceCard key={s.id} data={{"name" : s.name, "review" : s.rating}} />
      ))}
    </div>
  const filtered = !search
    ? services
    : services.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );

  const handleTypeService = (e) => setSearch(e.target.value);

  const handleSaveService = (svcFromPopup) => {
    // svcFromPopup: { roomName, petType, price, image }
    const newService = {
      id: Date.now(),
      name: svcFromPopup.roomName || "new service",
      review: "0.0/5.0(star)",
      image: svcFromPopup.image || "",
      petType: svcFromPopup.petType,
      price: svcFromPopup.price,
    };
    setServices((prev) => [newService, ...prev]);
    setIsPopupOpen(false);
  };

  return (
    <main className="flex-1">
      <div className="flex items-center my-8 w-full px-8">
        <div className="flex flex-1 border-2 rounded-4xl px-6 py-4 text-3xl">
          <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center -bottom-1 relative"></i>
          <input
            className="w-full outline-0 placeholder:opacity-75 text-2xl"
            placeholder="search"
            onChange={handleTypeService}
            value={search}
          />
        </div>

        <div className="flex gap-6 ml-8">
          {/* OPEN POPUP */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-12 py-4 font-semibold bg-[var(--light-brown-color)] rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-xl w-40"
          >
            add
          </button>

          <button className="px-12 py-4 font-semibold bg-[var(--light-brown-color)] rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-xl w-40">
            delete
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-2xl w-full text-center mt-32 italic">No result.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
          {filtered.map((data) => (
            <ServiceCard
              key={data.id}
              img={data.image}
              name={data.name}
              rating={data.review}
            />
          ))}
        </div>
      )}

      {/* POPUP */}
      {isPopupOpen && (
        <AddServicePopup
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSaveService}
        />
      )}

      <Outlet />
    </main>
  );
};

export default ServiceEdit;
