import { Outlet } from "react-router-dom";
import { useState } from "react";
import ServiceCard from "../ServiceCard";

const mockServices = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  name: "service_name",
  review: "x.x/5.0(star)",
  image: "", // Add image property if needed
}));

const ServiceEdit = () => {
  const [search, setSearch] = useState("");
  
  // Filter services based on search input
  const filterService = () => {
    if (!search) return mockServices;
    return mockServices.filter(service =>
      service.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const noResult = filterService().length === 0;

  const handleTypeService = (e) => {
    setSearch(e.target.value);
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
          <button className="px-12 py-4 font-semibold bg-[var(--light-brown-color)] rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-xl w-40">add</button>
          <button className="px-12 py-4 font-semibold bg-[var(--light-brown-color)] rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-xl w-40">delete</button>
        </div>
      </div>
      
      {noResult ? (
        <p className="text-2xl w-full text-center mt-32 italic">
          No result.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
          {filterService().map((data, idx) => (
            <ServiceCard
              key={idx}
              img={data.image}
              name={data.name}
              rating={data.review}
            />
          ))}
        </div>
      )}

      <Outlet />
    </main>
  );
};

export default ServiceEdit;