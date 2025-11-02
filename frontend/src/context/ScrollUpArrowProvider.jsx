import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { createContext, useContext, useState } from "react";

const ScrollUpArrowContext = createContext();

const ScrollUpArrowProvider = ({ children }) => {
  const [show, setShow] = useState(true);
  const [isScrollThreshold, setIsScrollThreshold] = useState(false)
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (window.scrollY >= 400) {
      setIsScrollThreshold(true);
    } else {
      setIsScrollThreshold(false);
    }
  });

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ScrollUpArrowContext.Provider value={{ setShow }}>
      {children}
      <AnimatePresence>
        {show && isScrollThreshold && (
          <motion.i
            initial={{ opacity: 0, y: "-50px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-50px" }}
            onClick={handleScrollUp}
            style={{ zIndex: 2000 }}
            className="bi bi-arrow-up-circle-fill flex justify-center fixed top-20 right-10 items-center !text-[var(--brown-color)] cursor-pointer scale-200"
          ></motion.i>
        )}
      </AnimatePresence>
    </ScrollUpArrowContext.Provider>
  );
};

const useScrollUpArrow = () => {
  return useContext(ScrollUpArrowContext);
};

export { useScrollUpArrow, ScrollUpArrowProvider };
