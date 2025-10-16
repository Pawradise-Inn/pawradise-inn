import { motion } from "motion/react";
import { useState } from "react";
import { useNotification } from "../../context/notification/NotificationProvider";
import testImage from "../../assets/test.png";
import { deleteChatLogAPI, updateChatLogAPI } from "../../hooks/chatlogAPI";
import { useOutletContext } from "react-router-dom";

const ReviewPopup = ({ data, onClick, editable, ...motionProps }) => {
  const { createNotification } = useNotification();
  const [newData, setNewData] = useState(data);
  const { setHistorys } = useOutletContext();

  const handleSubmitNewComment = async () => {
    try {
      updateChatLogAPI(data.id, {
        review: newData.review,
        rating: newData.rating,
      });

      setHistorys((prev) => {
        return prev.map((history) => {
          if (history.id === data.id) {
            return newData;
          }
          return history;
        });
      });

      createNotification(
        "success",
        "Review updated",
        "Your review has been updated successfully."
      );
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDeleteComment = () => {
    const Id = data.id;
    deleteChatLogAPI(Id)
      .then((res) => {
        createNotification(
          "success",
          "Review removed",
          "Your review have been removed."
        );
        setHistorys((prev) => prev.filter((history) => history.id !== Id));
      })
      .catch((error) => {
        console.error("Failed to delete comment:", error);
      });
  };

  const getStarColor = (value) => {
    if (value <= newData.rating) {
      return "!text-yellow-300";
    } else {
      return "!text-gray-300";
    }
  };

  return (
    <motion.div
      className="fixed w-dvw h-dvh top-0 left-0 z-20 overflow-y-auto overflow-x-hidden"
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
            {data.type === "service" ? (
              <b>
                {data.type} : {data.name}
              </b>
            ) : (
              <b>room_{data.name.toString().padStart(3, 0)}</b>
            )}
          </p>
          <p className="text-2xl mb-1">
            <b>Rating</b>
          </p>
          <div className="ml-4 flex gap-6 text-3xl mb-2 ">
            {[1, 2, , 3, 4, 5].map((value) => {
              return (
                <i
                  key={value}
                  onClick={() =>
                    !data.nameOfStaffReply &&
                    setNewData({ ...newData, rating: value })
                  }
                  className={`bi bi-star-fill ${getStarColor(
                    value
                  )} inline-flex justify-center items-center ${
                    !data.nameOfStaffReply && "cursor-pointer"
                  }`}
                ></i>
              );
            })}
          </div>
          <section>
            <p className="text-2xl my-1">
              <b>Review detail</b>
            </p>
            <textarea
              disabled={!!data.nameOfStaffReply}
              className={`${
                !!data.nameOfStaffReply && "opacity-70"
              } mb-2  w-full h-30 p-2 border-2 border-[var(--light-brown-color)] outline-0 bg-[var(--cream-color)] rounded-lg resize-none overflow-auto`}
              value={newData.review}
              onChange={(e) =>
                setNewData({ ...newData, review: e.target.value })
              }
              placeholder="Write your review here"
            ></textarea>
          </section>
          {!!data.nameOfStaffReply && (
            <section>
              <p className="text-2xl my-1">
                <b>Staff reply</b>
              </p>
              <p className="my-1">
                Reply by: <i>{data.nameOfStaffReply}</i>
              </p>
              <div className="w-full h-40 p-2 border-2 border-[var(--light-brown-color)] outline-0 bg-[var(--cream-color)] rounded-lg resize-none overflow-y-auto">
                {data.reply}
              </div>
            </section>
          )}

          {!data.nameOfStaffReply && (
            <div>
              {editable ? (
                <div>
                  <button
                    // !dataStatus, editable
                    onClick={() =>
                      createNotification(
                        "warning",
                        "Are you sure to update your review?",
                        "This will save your changes to the review and rating.",
                        () => {
                          onClick();
                          handleSubmitNewComment();
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
                        "Are you sure to remove your review?",
                        "Your review data will be removed.",
                        () => {
                          onClick();
                          handleDeleteComment();
                        }
                      )
                    }
                    className="bg-[var(--dark-brown-color)] !text-white py-1 rounded-lg font-bold text-2xl cursor-pointer transition-all duration-200 active:scale-90 "
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  // !dataStatus, !editable
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
              )}{" "}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewPopup;
