import { motion } from "motion/react";
import { NavLink } from "react-router-dom";

const PetCardAdd = ({ ...motionProps }) => {
  return (
    <motion.div {...motionProps}>
      <NavLink to="/profile/pet/new">
        <div className="bg-[var(--cream-color)] rounded p-4 shadow-lg flex flex-col space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400">
          <div className="w-full h-64 bg-[var(--cream-color)] rounded mb-4 flex items-center justify-center overflow-hidden">
            <div className="text-6xl !text-gray-400 flex items-center justify-center leading-none mt-9">+</div>
          </div>
          <div className="flex justify-between mb-3">
            <span className="px-5 py-1 text-xs rounded-full opacity-0">
              &nbsp;
            </span>
            <div className="text-center">
              <p className="text-xl font-semibold opacity-0">&nbsp;</p>
            </div>
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
};

export default PetCardAdd;
