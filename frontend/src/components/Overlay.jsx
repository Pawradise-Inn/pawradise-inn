import { motion } from "motion/react";

const Overlay = ({ ...motionProps }) => {
  return (
    <motion.div
      className="z-10 bg-black w-dvw h-dvh fixed top-0 left-0"
      {...motionProps}
    />
  );
};

export default motion.create(Overlay);
