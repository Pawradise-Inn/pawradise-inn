import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
const PetCard = ({ pet }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <NavLink to={`/staff/pet/${pet.id}`}>
        <div className="mx-5 bg-[var(--cream-color)] border-1 border-color-[var(--dark-brown-color)] rounded-xl p-4 shadow-lg flex flex-col space-y-4 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <div className="w-full aspect-square bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={pet.picture}
              alt="pet"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-center">
              <p className="text-xl font-semibold">{pet.name}</p>
            </div>
            <span className="px-5 py-1 !text-white text-xs rounded-full bg-[var(--dark-brown-color)] font-semibold">
              {pet.status}
            </span>
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
};

export default PetCard