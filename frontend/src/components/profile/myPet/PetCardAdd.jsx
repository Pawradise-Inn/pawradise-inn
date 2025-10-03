import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const PetCardAdd = ({ ...motionProps }) => {
  return (
    <motion.div {...motionProps}>
      <div className="h-full w-full bg-[var(--cream-color)] rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400">
        <NavLink to="/profile/pet/new">
          <div className="w-full h-full rounded-lg mb-4 flex items-center justify-center">
            <div className="text-6xl !text-gray-400">+</div>
          </div>
        </NavLink>
      </div>
    </motion.div>
  );
};

export default PetCardAdd;
