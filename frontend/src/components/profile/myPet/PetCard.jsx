import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import {petStatusColor} from "../../staff/StatusUtils";
import testImage from "../../../assets/test.png";

const PetCard = ({ pet, ...motionProps }) => {
  return (
    <motion.div {...motionProps}>
      <NavLink to={`/profile/pet/${pet.id}`}>
        <div className="bg-[var(--cream-color)] rounded p-4 shadow-lg flex flex-col space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="w-full h-full bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={pet.picture || testImage}
              alt="pet"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="flex justify-between mb-3">
            <span className= {`px-5 py-1  text-sm ${petStatusColor(pet.status)} rounded-full font-semibold text-center inline-block whitespace-nowrap shadow-md border`}>
              {pet.status}
            </span>
            <div className="text-center">
              <p className="text-xl font-semibold">{pet.name}</p>
            </div>
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
};

export default PetCard;
