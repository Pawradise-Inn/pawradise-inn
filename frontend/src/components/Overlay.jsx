import { motion } from "motion/react";
import {
  useScrollUpArrow,
} from "../context/ScrollUpArrowProvider";
import { useEffect } from "react";

const Overlay = ({
  bgColor,
  style = {},
  onClick = null,
  className = "",
  ...motionProps
}) => {
  const { setShow } = useScrollUpArrow();

  useEffect(() => {
    setShow(false);
    return () => setShow(true);
  }, []);

  return (
    <motion.div
      onClick={onClick}
      id="overlay-root"
      style={{ backgroundColor: bgColor, ...style }}
      className={`z-10 w-full h-full fixed top-0 left-0 ${className} `}
      {...motionProps}
    ></motion.div>
  );
};

export default Overlay;
