import { motion } from "motion/react";
import { handleFormDataChange } from "../../../../utils/handleForm";

const PetInput = ({ data, setData, name, label, ...motionProps }) => {
  return (
    <motion.div {...motionProps}>
      <div>
        <label className="block text-sm font-semibold mb-2">{label}</label>
        <input
          type="text"
          value={data}
          name={name}
          onChange={(e) => handleFormDataChange(e, setData)}
          className="w-full shadow-md px-6 py-4 rounded-lg border-2 transition-all duration-300 border-[var(--dark-brown-color)] bg-[var(--cream-color)] focus:border-gray-400 focus:outline-none"
        />
      </div>
    </motion.div>
  );
};

export default PetInput;
