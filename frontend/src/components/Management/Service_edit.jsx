import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import testImg from "../../assets/test.png";
import { useNotification } from "../../context/notification/NotificationProvider";
import ServiceCard from "../service/ServiceCard";
import AddServicePopup from "./add_service";
// 1. Import all the necessary API functions
import {
  addServiceAPI,
  deleteServiceAPI,
  fetchAllServicesAPI,
  updateServiceAPI,
} from "../../hooks/serviceAPI"; // Assuming your hook file is at this path
import { AnimatePresence } from "motion/react";
import Overlay from "../Overlay";
import { overlay, popUP } from "../../styles/animation";

const ServiceEdit = () => {
  const { createNotification } = useNotification();
  // 2. Initialize services as an empty array and add loading/error states
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // 3. Fetch initial data from the API when the component mounts
  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetchAllServicesAPI();
        // Assuming the backend returns data in a { success: true, data: [...] } format
        // And that each service object has id, name, picture (as image), review
        setServices(response.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Could not load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []); // Empty array ensures this runs only once on mount

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

  // 4. Update the save handler to use API calls
  const handleSaveService = async (payload) => {
    try {
      if (selected) {
        // EDIT MODE
        const response = await updateServiceAPI(selected.id, payload);
        const updatedService = response.data;
        setServices((prev) =>
          prev.map((item) =>
            item.id === updatedService.id ? updatedService : item
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
      createNotification("fail", "Save Failed", "Failed to save service.");
    }
  };

  // 5. Update the delete handler to use an API call
  const handleDeleteService = async (id) => {
    try {
      await deleteServiceAPI(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      closePopup();
    } catch (err) {
      console.error("Failed to delete service:", err);
      createNotification("fail", "Delete Failed", "Failed to delete service.");
    }
  };

  // 6. Add conditional rendering for loading and error states
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
      {/* Top bar (unchanged) */}
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
            className="px-12 py-4 cursor-pointer font-semibold bg-[var(--light-brown-color)] rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-xl w-40"
          >
            add
          </button>
        </div>
      </div>

      {/* Grid (now renders API data) */}
      {filtered.length === 0 ? (
        <p className="text-2xl w-full text-center mt-32 italic">No result.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
          {filtered.map((s) => (
            <ServiceCard
              key={s.id}
              data={{
                image: s.picture || testImg,
                name: s.name,
                review: s.review || 0,
              }}
              onClick={() => openEdit(s)}
            />
          ))}
        </div>
      )}

      {/* Popup (unchanged, but now calls the updated handlers) */}
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
          <AddServicePopup
            variants={popUP}
            initial="hidden"
            animate="visible"
            exit="hidden"
            title={selected ? "Edit service" : "Add service"}
            initialData={selected}
            onClose={closePopup}
            onSave={handleSaveService}
            onDelete={handleDeleteService}
          />
        </>
      )}
      </AnimatePresence>

      <Outlet className="overflow-y-hidden" />
    </main>
  );
};

export default ServiceEdit;
