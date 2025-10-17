import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNotification } from "../../context/notification/NotificationProvider";
import testImage from "../../assets/test.png";
import { updateChatLogAPI } from "../../hooks/chatlogAPI";

const ToBeReviewedPopUp = ({
  data,
  setHistorys,
  onClick,
  ...motionProps
}) => {
  const { createNotification } = useNotification();
  const [currentRating, setCurrentRating] = useState(data.rating || 0);
  const [reviewText, setReviewText] = useState(data.review || "");
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setCurrentRating(data.rating || 0);
    setReviewText(data.review || "");
  }, [data]);

  const handleSubmitReview = async () => {
    try {
      await updateChatLogAPI(data.id, {
        review: reviewText,
        rating: currentRating,
      });

      setHistorys((prevItems) =>
        prevItems.filter((item) => item.id !== data.id)
      );

      createNotification(
        "success",
        "Review Submitted",
        "Your review has been successfully submitted."
      );
      onClick();
    } catch (error) {
      console.error("Failed to submit review:", error);
      createNotification(
        "fail",
        "Submission Failed",
        "There was an error submitting your review."
      );
    }
  };

  const handleDeleteReview = () => {
    createNotification(
      "warning",
      "Are you sure you want to delete this?",
      "This action cannot be undone.",
      () => {
        onClick();
        createNotification(
          "success",
          "Review Deleted",
          "Your review has been deleted (simulated)."
        );
      }
    );
  };

  return (
    <motion.div
      className="fixed w-dvw h-dvh top-0 left-0 z-20 overflow-x-hidden"
      {...motionProps}
    >
      <div className="absolute p-10 flex gap-5 w-9/10 max-w-5xl bg-white rounded-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <i
          onClick={onClick}
          className="bi bi-x-lg flex justify-center items-center absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-3xl cursor-pointer transition-all duration-200 hover:scale-125"
        />
        <img
          src={testImage}
          alt="serviceImg"
          className="w-1/2 h-auto rounded-2xl object-center object-cover"
        />
        <div className="flex flex-col justify-between gap-2 w-1/2">
          <p className="text-2xl mb-2 ">
            <b>
              {data.type} : {data.name}
            </b>
          </p>
          <p className="text-2xl mb-1">
            <b>Rating</b>
          </p>
          {/* CORRECTED BLOCK START */}
          <div
            className="ml-4 flex gap-6 text-3xl mb-2"
            onMouseLeave={() => setHoverRating(0)} // <-- FIX: Moved handler here
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <i
                key={value}
                className={`bi bi-star-fill cursor-pointer transition-colors duration-200 ${
                  value <= (hoverRating || currentRating)
                    ? "!text-yellow-400"
                    : "!text-gray-300"
                }`}
                onClick={() => setCurrentRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                // <-- FIX: Removed handler from here
              ></i>
            ))}
          </div>
          {/* CORRECTED BLOCK END */}
          <section>
            <p className="text-2xl my-1">
              <b>Review detail</b>
            </p>
            <textarea
              className="mb-2 w-full h-30 p-2 border-2 border-[var(--light-brown-color)] outline-0 bg-[var(--cream-color)] rounded-lg resize-none"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here"
            ></textarea>
          </section>

          <button
            onClick={() =>
              createNotification(
                "warning",
                "Confirm Review Submission",
                "Are you sure you want to submit this review?",
                handleSubmitReview
              )
            }
            className="bg-[var(--dark-brown-color)] !text-white py-1 rounded-lg font-bold text-2xl cursor-pointer transition-all duration-200 active:scale-90 hover:bg-[#5a4444]"
          >
            Submit Review
          </button>
          <button
            onClick={handleDeleteReview}
            className="bg-red-600 !text-white py-1 rounded-lg font-bold text-2xl cursor-pointer transition-all duration-200 active:scale-90 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ToBeReviewedPopUp;