import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";

const Pet_card = ({ pet }) => {
  return (
    <div>
      <NavLink to={`/profile/pet/${pet.id}`}>
        <div className="bg-[var(--cream-color)] rounded p-4 shadow-lg flex flex-col space-y-4 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer">
          <div className="w-full h-full bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={pet.picture}
              alt="pet"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="flex justify-between mb-3">
            <span className="px-5 py-1 !text-white text-xs rounded-full bg-[var(--dark-brown-color)] font-semibold">
              {pet.status}
            </span>
            <div className="text-center">
              <p className="text-xl font-semibold">{pet.name}</p>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

const Pet_comp = () => {
  const { user, setUser } = useOutletContext();
  const [pets, setPets] = useState([]);
  useEffect(() => {
    if (user) {
      setPets(user.customer.pets || "");
    }
  }, [user]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-8xl">
        
        {pets.map((pet) => (
          <Pet_card key={pet.id} pet={pet} />
        ))}
        <div className="bg-[var(--cream-color)] rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400">
          <NavLink to="/profile/pet/new">
            <div className="w-full h-full rounded-lg mb-4 flex items-center justify-center">
              <div className="text-6xl !text-gray-400">+</div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Pet_comp;
