// star: amount of star this component represents
// commentStar: current selected star amount
// onClick: function to set commentStar to star
import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";

const CommentStarSelector = ({ star, onClick, commentStarSelect, style }) => {
  return (
    <button
      onClick={() => onClick(star)}
      className={`${style} relative py-2 px-5 cursor-pointer transition-all duration-200`}
    >
      {star === null ? (
        "All"
      ) : (
        <>
          {star}{" "}
          <i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i>
        </>
      )}
      <AnimatePresence mode="wait">
        {commentStarSelect === star && (
          <motion.div
            key={`selector-${star}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="z-10 absolute top-0 left-0 w-full h-full bg-transparent outline-2 outline-[var(--brown-color)] flex justify-center items-center"
          />
        )}
      </AnimatePresence>
    </button>
  );
};
export default memo(CommentStarSelector);
