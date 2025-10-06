// star: amount of star this component represents
// commentStar: current selected star amount
// onClick: function to set commentStar to star

import { memo } from "react";

const CommentStarSelector = ({ star, onClick, style }) => {
  return (
    <button
      onClick={() => onClick(star)}
      className={`${style} py-2 px-5 cursor-pointer transition-all duration-100 hover:bg-[var(--cream-color)] hover:outline-2 outline-[var(--brown-color)]`}
    >
      {star === 6 ? (
        "All"
      ) : (
        <>
          {star}{" "}
          <i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i>
        </>
      )}
    </button>
  );
};
export default memo(CommentStarSelector);
