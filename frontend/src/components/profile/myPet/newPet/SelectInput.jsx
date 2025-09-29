import { motion } from "motion/react";
import { handleFormDataChange } from "../../../../utils/handleForm";

const SelectInput = ({ setData, name, label, options, ...motionProps }) => {
  return (
    <motion.div {...motionProps}>
      <div>
        <label className="block text-sm font-semibold mb-2">{label}</label>
        <select
          name={name}
          onChange={(e) => handleFormDataChange(e, setData)}
          className="w-full shadow-md px-6 py-4.5  rounded-lg border-2 transition-all duration-300 border-(--dark-brown-color) bg-(--cream-color) focus:border-gray-400 focus:outline-none"
        >
          <option value="">Select {name}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};

export default motion.create(SelectInput);
