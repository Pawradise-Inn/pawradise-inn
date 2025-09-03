import { Outlet } from "react-router-dom";
import ServiceCard from "../ServiceCard";

const mockServices = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  name: "service_name",
  rating: "x.x/5.0(star)",
}));

const ServiceEdit = () => (
  <main className="flex-1">
    <div className="flex justify-end gap-6 mb-8" style={{ marginTop: "10px", marginRight: "20px" }}>
      <button className="px-8 py-2 bg-[var(--light-brown-color)] rounded">ADD</button>
      <button className="px-8 py-2 bg-[var(--light-brown-color)] rounded">DELETE</button>
    </div>

    {/* Use your ServiceCard component */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
      {mockServices.map((s) => (
        <ServiceCard key={s.id} name={s.name} rating={s.rating} />
      ))}
    </div>

    <Outlet />
  </main>
);

export default ServiceEdit;