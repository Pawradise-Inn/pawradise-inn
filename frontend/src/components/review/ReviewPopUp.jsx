import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNotification } from "../../context/notification/NotificationProvider";

const ReviewPopup = ({
  data,
  setHistorys,
  onClick,
  editable,
  ...motionProps
}) => {
  const { createNotification } = useNotification();
  const [newData, setNewData] = useState(data);

  useEffect(() => {
    console.log(newData);
  }, [newData]);

  const getStarColor = (value) => {
    if (value <= newData.rating) {
      return "!text-yellow-300";
    } else {
      return "!text-gray-300";
    }
  };

  return (
    <motion.div
      className="fixed w-dvw h-dvh top-0 left-0 z-20 overflow-y-auto overflow-x-hidden flex items-center justify-center"
      {...motionProps}
    >
      <div className="relative p-10 flex gap-4 w-9/10 max-w-4xl bg-white rounded-3xl">
        <i
          onClick={onClick}
          className="bi bi-x-lg flex justify-center items-center absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-3xl cursor-pointer transition-all duration-200 hover:scale-125"
        />
        <img
          src={data.image}
          alt="serviceImg"
          className="w-1/2 h-auto rounded-2xl object-center object-cover"
        />
        <div className="flex flex-col gap-2 w-1/2">
          <p className="text-xl">service: {data.name}</p>
          <p className="text-2xl">
            <b>rating</b>
          </p>
          <div className="my-2 ml-4 flex gap-6 text-3xl">
            {[1, 2, , 3, 4, 5].map((value) => {
              return (
                <i
                  key={value}
                  onClick={() => setNewData({ ...newData, rating: value })}
                  className={`bi bi-star-fill ${getStarColor(
                    value
                  )} inline-flex justify-center items-center cursor-pointer`}
                ></i>
              );
            })}
          </div>
          <p className="text-2xl">
            <b>review detail</b>
          </p>
          <textarea
            className="w-full h-40 p-2 border-2 border-[var(--light-brown-color)] outline-0 bg-[var(--cream-color)] rounded-lg my-2 resize-none"
            value={newData.review}
            onChange={(e) => setNewData({ ...newData, review: e.target.value })}
            placeholder="Write your review here"
          ></textarea>

          {editable ? (
            <>
              <button
                onClick={() =>
                  createNotification(
                    "warning",
                    "Are you sure to update your review?",
                    "This will save your changes to the review and rating.",
                    () => {
                      onClick();
                      createNotification(
                        "success",
                        "Review Updated",
                        "Your review has been updated successfully."
                      );
                      setHistorys((prev) => {
                        return prev.map((history) => {
                          if (history.id === data.id) {
                            return newData;
                          }
                          return history;
                        });
                      });
                    }
                  )
                }
                className="bg-[var(--dark-brown-color)] !text-white py-1 rounded-lg font-bold text-2xl cursor-pointer transition-all duration-200 active:scale-90 "
              >
                Update
              </button>
              <button
                onClick={() =>
                  createNotification(
                    "warning",
                    "Are you sure to cancel your change?",
                    "Your modified data will be lost.",
                    () => {
                      onClick();
                      createNotification(
                        "fail",
                        "Changes Discarded",
                        "Your review changes have been cancelled."
                      );
                    }
                  )
                }
                className="bg-[var(--dark-brown-color)] !text-white py-1 rounded-lg font-bold text-2xl cursor-pointer transition-all duration-200 active:scale-90 "
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() =>
                createNotification(
                  "warning",
                  "Are you sure to submit your review?",
                  "This will save your review and rating.",
                  () => {
                    onClick();
                    createNotification(
                      "success",
                      "Review Submitted",
                      "Your review has been saved successfully."
                    );
                  }
                )
              }
              className="bg-[var(--dark-brown-color)] !text-white py-1 rounded-lg font-bold text-2xl cursor-pointer transition-all duration-200 active:scale-90 "
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewPopup;
