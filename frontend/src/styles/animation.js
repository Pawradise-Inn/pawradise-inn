const overlay = {
  visible: { opacity: 0.7 },
  hidden: { opacity: 0 },
};

const popUP = {
  visible: { opacity: 1, transform: "translateY(0)" },
  hidden: { opacity: 0, transform: "translateY(100%)" },
};

const dropDown = {
  hidden: {
    opacity: 0,
    scaleY: 0,
    transition: {
      opacity: { duration: 0.1 },
      scaleY: { duration: 0.2 },
    },
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      opacity: { duration: 0.1 },
      scaleY: { duration: 0.2 },
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transition: {
      opacity: { duration: 0.1 },
      scaleY: { duration: 0.2 },
    },
  },
};

const notification = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } },
  exit: { opacity: 0, x: 50, transition: { type: "spring", bounce: 0.4 } },
  shaking: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } },
};

const startUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.3, duration: 0.35 },
  }),
  exit: {
    y: 50,
    opacity: 0,
    transition: { type: "spring", bounce: 0.4 },
  },
  found: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4 },
  },
};

// New animation variants for enhanced page transitions
const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export {
  notification,
  overlay,
  popUP,
  dropDown,
  startUpVariants,
  slideInLeft,
  slideInRight,
  fadeInUp,
  staggerContainer,
  staggerItem,
};
