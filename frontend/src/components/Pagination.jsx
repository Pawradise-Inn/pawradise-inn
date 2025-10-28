import { motion } from "motion/react";
// pageAmount: total number of pages
// currentPage: current page number
// onClick: function to handle page change, takes the new page number as argument

import { memo, useMemo } from "react";
import { getArrayWithRangeWithMid } from "../utils/HandleArray";

const Pagination = ({
  id,
  pageAmount,
  currentPage,
  onClick,
  commentPerPage,
  ...motionProps
}) => {
  // check if the page number is the current page and hightlight it
  const checkCurrentPage = (pageNum) => {
    return pageNum === currentPage;
  };

  const normalizingPageAmount = useMemo(() => {
    return Math.max(1, Math.ceil(pageAmount / commentPerPage));
  }, [pageAmount])

  return (
    <motion.div
      className="my-10 flex justify-center items-center gap-1"
      {...motionProps}
    >
      <i
        onClick={() => onClick(1)}
        className={`${
          checkCurrentPage(1)
            ? "pointer-events-none opacity-40"
            : "pointer-events-auto opacity-100"
        } bi bi-chevron-double-left inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200`}
      ></i>
      <i
        onClick={() => onClick(Math.max(1, currentPage - 1))}
        className={`${
          checkCurrentPage(1)
            ? "pointer-events-none opacity-40"
            : "pointer-events-auto opacity-100"
        } bi bi-chevron-left inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200 mr-2`}
      ></i>

      {getArrayWithRangeWithMid(5, currentPage, normalizingPageAmount).map((pageNum) => (
        <button
          key={`${id}${pageNum}`}
          className={`px-3 py-1 cursor-pointer hover:bg-[var(--light-brown-color)] transition-all duration-200 rounded-full ${
            checkCurrentPage(pageNum) ? "bg-[var(--light-brown-color)]" : null
          }`}
          onClick={() => onClick(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      <i
        onClick={() => onClick(Math.min(normalizingPageAmount, currentPage + 1))}
        className={`${
          checkCurrentPage(normalizingPageAmount)
            ? "pointer-events-none opacity-40"
            : "pointer-events-auto opacity-100"
        } bi bi-chevron-right inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200 ml-2`}
      ></i>
      <i
        onClick={() => onClick(normalizingPageAmount)}
        className={`${
          checkCurrentPage(normalizingPageAmount)
            ? "pointer-events-none opacity-40"
            : "pointer-events-auto opacity-100"
        } bi bi-chevron-double-right inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200`}
      ></i>
    </motion.div>
  );
};

export default memo(Pagination);
