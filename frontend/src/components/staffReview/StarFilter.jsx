import { motion } from "motion/react";
import { dropDown } from "../../styles/animation";

const StarFilter = ({ onFilterChange }) => {
  const options = [
    { label: "All Stars", value: null },
    { label: "5 Stars ★★★★★", value: 5 },
    { label: "4 Stars ★★★★☆", value: 4 },
    { label: "3 Stars ★★★☆☆", value: 3 },
    { label: "2 Stars ★★☆☆☆", value: 2 },
    { label: "1 Star ★☆☆☆☆", value: 1 },
  ];

  return (
    <motion.div
      key="dropDownBlock"
      variants={dropDown}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={
        "absolute right-0 top-full z-10 mt-2 overflow-hidden rounded-lg bg-white shadow-lg origin-top"
      }
    >
      {" "}
      {options.map((option) => (
        <div
          key={option.label}
          className="cursor-pointer whitespace-nowrap px-6 py-3 transition-colors hover:bg-gray-100"
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}{" "}
        </div>
      ))}{" "}
    </motion.div>
  );
};

export default StarFilter;
