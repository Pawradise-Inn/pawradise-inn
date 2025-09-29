import { motion } from "motion/react";

const RadioInput = ({ name, options, selected, onChange, ...motionProps }) => {
  return (
    <motion.div {...motionProps}>
      <div className="flex my-6 space-x-6">
        {options.map((opt) => (
          <label
            key={opt}
            className="relative flex items-center space-x-2 cursor-pointer font-semibold"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={selected === opt}
              onChange={() => onChange(opt)}
              className="hidden peer"
            />

            <div
              className="relative w-10 h-10 border-2 border-(--brown-color) rounded transition-all bg-(--cream-color)
              before:absolute before:top-1/2 before:left-1/2 before:w-8 before:h-0.5 before:bg-(--dark-brown-color)
              before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform
              before:transition-all before:scale-0 peer-checked:before:scale-100"
            ></div>

            <span>{opt}</span>
          </label>
        ))}
      </div>
    </motion.div>
  );
};

export default motion.create(RadioInput);
