import { handleFormDataChange } from "../../../../utils/handleForm";
import { motion } from "motion/react";

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
          className="w-full shadow-md px-6 py-4 rounded-lg border-2 transition-all duration-300 border-(--dark-brown-color) bg-(--cream-color) focus:border-gray-400 focus:outline-none"
        />
      </div>
    </motion.div>
  );
};

export default motion.create(PetInput);
