const overlay = {
  visible: { opacity: 0.7 },
  hidden: { opacity: 0 },
};

const popUP = {
  visible: { opacity: 1, transform: "translateY(0)" },
  hidden: { opacity: 0, transform: "translateY(100%)" },
};

const startUpVariants = {
  hidden: { opacity: 0, y: 50 },
  firstRender: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.3, duration: 0.7 },
  }),
  found: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4 },
  },
  exit: { y: 50, opacity: 0, transition: { type: "spring", bounce: 0.4 } },
};

export { overlay, popUP, startUpVariants };
