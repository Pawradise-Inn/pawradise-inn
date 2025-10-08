import { motion } from "motion/react";

const Overlay = ({ bgColor, style={}, className = "", ...motionProps }) => {
  return (
    <motion.div
      style={{ backgroundColor: bgColor, ...style }}
      className={`z-10 w-full h-full fixed top-0 left-0 ${className} `}
      {...motionProps}
    ></motion.div>
  );
};

export default Overlay;
