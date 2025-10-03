import { motion } from "motion/react";

const Overlay = ({ bgColor, className, ...motionProps }) => {
  return (
    <motion.div
      className={`z-10 bg-${bgColor} w-dvw h-dvh fixed top-0 left-0 ${className}`}
      {...motionProps}
    />
  );
};

export default motion.create(Overlay);
