import { motion } from "motion/react";

const Overlay = ({ bgColor, className = "", ...motionProps }) => {
  return (
    <motion.div
      style={{ backgroundColor: bgColor }}
      className={`z-10 w-full h-full fixed top-0 left-0 ${className} `}
      {...motionProps}
    ></motion.div>
  );
};

export default Overlay;
