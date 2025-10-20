import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { petStatusColor, getStatusText } from "./StatusUtils";
import { startUpVariants } from "../../styles/animation";
const PetCard = ({ pet }) => {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        variants={startUpVariants}
        initial="hidden"
        animate="found"
        exit="exit"
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavLink to={`/staff/pet-status/${pet.id}`}>
          <div className="mx-5 bg-gradient-to-br from-[var(--cream-color)] to-white border border-[var(--dark-brown-color)]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer min-w-[300px] min-h-[420px] backdrop-blur-sm relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--dark-brown-color)]/5 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="w-full h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 flex items-center justify-center overflow-hidden shadow-inner ring-1 ring-white/50">
                <img
                  src={pet.picture}
                  alt="pet"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[var(--dark-brown-color)] tracking-wide">
                    {pet.name}
                  </h3>
                </div>
                <span
                  className={`px-4 py-2 text-sm font-semibold rounded-full min-w-[120px] text-center inline-block whitespace-nowrap shadow-md border transition-all duration-300 hover:scale-105 ${petStatusColor(
                    pet.status
                  )}`}
                >
                  {(pet.status)}
                </span>
              </div>
            </div>
          </div>
        </NavLink>
      </motion.div>
    </AnimatePresence>
  );
};

export default PetCard;
