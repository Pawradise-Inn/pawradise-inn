import { useEffect, useState, forwardRef, useRef } from "react";
import ReviewCard from "../../../components/staffReview/ReviewCard";
import StarFilter from "../../../components/staffReview/StarFilter";
import { AnimatePresence } from "motion/react";
import Pagination from "../../../components/Pagination";
import DateDropDown from "../../../components/DateDropDown";
import { getChatLogsAPI } from "../../../hooks/chatlogAPI";

// --- Main Component ---
const StaffReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [starFilter, setStarFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState("");
  const [isStarDropdownOpen, setIsStarDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  const ref = useRef(null);

  const DateFilterRef = forwardRef(({ value, onClick, className }, ref) => (
    <button type="button" onClick={onClick} className={className} ref={ref}>
      {value || "mm/dd/yyyy"}
    </button>
  ));

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsStarDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getChatLogsAPI();
        setReviews(response.data);
      } catch(err) {
        console.error("Failed to fetch reviews:",err);
        setReviews([]);
      }
    }
    fetchReviews();
  }, []);

  const handleDeleteReview = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  };

  const filteredReviews = reviews
    .filter((review) => {
      if (starFilter === null) return true;
      return Math.round(review.rating) === starFilter;
    })
    .filter((review) => {
      if (!dateFilter) return true; // Create date objects at midnight UTC to avoid timezone issues
      const reviewDate = new Date(review.reviewDate);
      reviewDate.setUTCHours(0, 0, 0, 0);
      const filterDate = new Date(dateFilter);
      filterDate.setUTCHours(0, 0, 0, 0);
      return reviewDate.getTime() === filterDate.getTime();
    });

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handleStarFilterChange = (starValue) => {
    setStarFilter(starValue);
    setCurrentPage(1);
    setIsStarDropdownOpen(false);
  };
  const handleDateChange = (value) => {
    setDateFilter(value);
    setCurrentPage(1);
  };
  const clearDateFilter = () => {
    setDateFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {" "}
      <div className="relative mx-auto max-w-7xl pb-4">
        {" "}
        <h1 className="text-center text-5xl font-bold text-gray-800 sm:text-6xl">
          Review
        </h1>{" "}
        <div className="absolute bottom-0 left-1/2 h-0.5 w-full -translate-x-1/2 bg-gray-800" />{" "}
      </div>{" "}
      <div className="mx-auto max-w-7xl">
        {" "}
        <div className="my-8 flex w-full flex-wrap items-center gap-4">
          {" "}
          <div className="min-w-[300px] flex-1 rounded-full border-2 px-4 py-3 text-xl">
            {" "}
            <div className="flex items-center">
              <i className="bi bi-search pr-2 opacity-50"></i>{" "}
              <input
                className="w-9/12 bg-transparent outline-none"
                placeholder="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="relative flex h-full w-2/12 items-center rounded-xl bg-[var(--brown-color)] text-lg">
            <DateDropDown
              value={dateFilter}
              onChange={(value) => handleDateChange(value)}
              customInput={
                <DateFilterRef className="relative cursor-pointer border-none !text-white outline-none px-6 py-3 w-full text-start" />
              }
            />
            {dateFilter && (
              <button
                onClick={clearDateFilter}
                className="absolute right-2.5 top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-white/20 font-bold leading-none text-white transition-opacity hover:opacity-80"
              >
                &times;{" "}
              </button>
            )}{" "}
          </div>{" "}
          <div className=" w-1/12" ref={ref}>
            <div className="relative w-full" >
              {" "}
              <button
              
                onClick={() => setIsStarDropdownOpen(!isStarDropdownOpen)}
                className="h-full w-full cursor-pointer whitespace-nowrap rounded-xl bg-[var(--brown-color)] px-6 py-3 text-lg !text-white transition-opacity hover:opacity-90 pr-15"
              >
                star{" "}
                <i
                  className={`bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl cursor-pointer pointer-events-none transition-all duration-200 !text-[var(--cream-color)] ${
                    isStarDropdownOpen && "rotate-180"
                  }`}
                ></i>{" "}
              </button>{" "}
              <AnimatePresence>
                {isStarDropdownOpen && (
                  <StarFilter
                    onFilterChange={handleStarFilterChange}
                    setIsStarDropdownOpen={setIsStarDropdownOpen}
                  />
                )}
              </AnimatePresence>{" "}
            </div>{" "}
          </div>
        </div>{" "}
      </div>{" "}
      <div className="mx-auto mt-8 max-w-7xl">
        {" "}
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={handleDeleteReview}
            />
          ))
        ) : (
          <p className="mt-16 text-center text-xl italic text-gray-500">
            No reviews available.
          </p>
        )}{" "}
      </div>{" "}
      {filteredReviews.length > 1 && (
        <div className="mx-auto max-w-7xl">
          {" "}
          <Pagination
            currentPage={currentPage}
            pageAmount={filteredReviews.length}
            onClick={setCurrentPage}
            commentPerPage={reviewsPerPage}
          />{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default StaffReviewPage;
