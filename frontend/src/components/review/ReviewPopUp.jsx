import { motion } from "motion/react";
import { useState } from "react";
import { useNotification } from "../../context/notification/NotificationProvider";
import testImage from "../../assets/test.png";
import { updateChatLogAPI } from "../../hooks/chatlogAPI";

const ReviewPopup = ({
  data,
  setHistorys,
  onClick,
  editable,
  ...motionProps
}) => {
  const { createNotification } = useNotification();
  const [newData, setNewData] = useState(data);

  const demoData =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error et distinctio dolorem fugiat inventore modi at architecto! Deleniti adipisci maxime minima nihil dolor. Facilis totam placeat optio minus eius ducimus qui quidem fuga odit, doloremque quaerat perspiciatis distinctio velit iusto sunt sapiente dolorum veritatis cupiditate, perferendis ea? Molestiae veritatis nihil quasi facere odio eius, quisquam perspiciatis cumque inventore nostrum modi eveniet minima ipsum recusandae suscipit dolorem doloremque porro aliquid ipsa, soluta at fugit quod deserunt. Magnam eaque autem vel ab nostrum maxime, eveniet quas explicabo a iste ducimus tenetur consequuntur rem at cumque accusamus! In quasi earum beatae excepturi nemo odio, quibusdam repellendus, id explicabo, aliquam animi dolore quia laborum ea illo assumenda labore? Sequi eaque, in sunt alias officia fuga quam? Quibusdam, accusantium distinctio nihil autem modi facere iste ex velit. Quos porro dolores earum vel ipsum officiis nemo eveniet libero iusto molestias veniam odit unde itaque dolore rerum mollitia tempora aperiam ipsa, quaerat incidunt maiores fugiat! Numquam similique excepturi iure culpa molestiae nobis expedita reiciendis neque architecto earum officia quod beatae quaerat eaque incidunt eos sequi, ipsam vel at fugiat assumenda suscipit nulla est. Autem aspernatur rerum illum quod, ex nihil quis, cum error beatae nemo quas tenetur.";

  // const handleSubmitNewComment = () => {
  //   updateChatLogAPI(data.id, {
  //     review: newData.review,
  //     rating: newData.rating,
  //   }).then((res) => console.log(res));

  //   setHistorys((prev) => {
  //     return prev.map((history) => {
  //       if (history.id === data.id) {
  //         return newData;
  //       }
  //       return history;
  //     });
  //   });
  // };
  const handleSubmitNewComment = async () => {
  try {
    const res = await updateChatLogAPI(data.id, {
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
      "Comment updated",
      "Your comment has been updated successfully."
    );
  } catch (error) {
    console.error("Failed to update comment:", error);
  }
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
            <b>
              {data.type} : {data.name}
            </b>
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
                    !data.status && setNewData({ ...newData, rating: value })
                  }
                  className={`bi bi-star-fill ${getStarColor(
                    value
                  )} inline-flex justify-center items-center ${
                    !data.status && "cursor-pointer"
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
              disabled={data.status}
              className={`${
                data.status && "opacity-70"
              } mb-2  w-full h-30 p-2 border-2 border-[var(--light-brown-color)] outline-0 bg-[var(--cream-color)] rounded-lg resize-none overflow-auto`}
              value={newData.review}
              onChange={(e) =>
                setNewData({ ...newData, review: e.target.value })
              }
              placeholder="Write your review here"
            ></textarea>
          </section>
          {data.status && (
            <section>
              <p className="text-2xl my-1">
                <b>Staff reply</b>
              </p>
              <p className="my-1">
                Reply by: <i>{data.staffReply}</i>
              </p>
              <div className="w-full h-40 p-2 border-2 border-[var(--light-brown-color)] outline-0 bg-[var(--cream-color)] rounded-lg resize-none overflow-y-auto">
                {demoData}
              </div>
            </section>
          )}

          {!data.status && (
            <>
              {editable ? (
                <>
                  <button
                    // !dataStatus, editable
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
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewPopup;
