// this file still have to fetch userId from token

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createBookedRoom } from "../../hooks/bookedRoomAPI";
import { createBookedService } from "../../hooks/bookedServiceAPI";
import { fetchAllPetAPI, fetchAvailablePetAPI } from "../../hooks/petAPI";
import {
  fetchRoomStatusAPI,
  fetchRoomWithCommentAPI,
} from "../../hooks/roomAPI";
import {
  fetchServiceCommentsAPI,
  fetchServiceReviewAPI,
  getServiceStatusAPI,
} from "../../hooks/serviceAPI";
import "../../styles/bookingBarStyle.css";
import { handleFormDataChange } from "../../utils/handleForm";
import { getDateValidation } from "../../utils/handleValidation";
import { useNotification } from "../../context/notification/NotificationProvider";
import CommentCard from "./CommentCard";
import CommentStarSelector from "./CommentStarSelector";
import Pagination from "./Pagination";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { notification, startUpVariants } from "../../styles/animation";

// data: { image, name, review, forwhich, price, size, maxsize, headerType } of service and room
const BookingBar = ({ data, popupStatus, onClick }) => {
  const navigate = useNavigate();
  const { createNotification } = useNotification();
  const { user } = useAuth();

  const selectableTime = ["08:00", "10:00", "12:00", "14:00", "16:00"];
  const [commentStarSelect, setCommentStarSelect] = useState(null);
  const [currentPage, setCurrentPage] = useState(data.currentPage || 1);
  const [comments, setComments] = useState([]);
  const [commentStatus, setCommentStatus] = useState(false);
  const [status, setStatus] = useState("date is invalid");
  const [currentPet, setCurrentPet] = useState(null);
  const [petData, setPetData] = useState([]);
  const [size, setSize] = useState(0);
  const [formData, setFormData] = useState({
    entryDate: "",
    exitDate: "",
    entryTime: "",
  });

  //  calculate date is valid or not
  //  @return: validDateStatus which contain 1)status, 2)warningText
  const validDateStatus = useMemo(() => {
    return getDateValidation(formData.entryDate, formData.exitDate);
  }, [formData]);

  //  handle form submit and check availability and validation
  //  @params: e -> form itself
  //  @constraint: if this is room and EntryDate and ExitDate is not fully filled Notify fail
  //  @constraint: if this is service and EntryDate and EntryTime is not fully filled Notify fail
  //  @constraint: if date is not valid Notify fail
  //  @constraint: if pet is not selected Notify faile
  //  @constraint: if this is room and all constraint pass call CreateRoomAPI and Notify according to status
  //  @constraint: if this is service and all constraint pass call CreateServiceAPI and Notify according to status
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      data.headerType === "Room" &&
      (!formData.entryDate || !formData.exitDate)
    ) {
      createNotification(
        "fail",
        "Date is missing",
        "Please select your dates."
      );
      return;
    }

    if (
      data.headerType === "Service" &&
      (!formData.entryDate || !formData.entryTime)
    ) {
      createNotification(
        "fail",
        "Date or time is missing",
        "Please select your date and time."
      );
      return;
    }

    if (!validDateStatus.status) {
      createNotification(
        "fail",
        "Date is invalid",
        validDateStatus.warningText
      );
      return;
    }

    if (!currentPet) {
      createNotification("fail", "Pet is missing", "Please select your pet.");
      return;
    }

    let body;
    if (data.headerType === "Service") {
      body = {
        service_name: data.name,
        pet_name: currentPet,
        bookingId: 1,
        scheduled: new Date(
          `${formData.entryDate}T${formData.entryTime}:00.00Z`
        ),
      };

      createBookedService(body, localStorage.getItem("token"))
        .then((res) => {
          if (res.success) {
            createNotification(
              "success",
              "Booking success",
              "Create booking successfully."
            );
          } else {
            createNotification("fail", "Booking fail", res.msg);
          }
        })
        .then(() => changeBookingBarStatus());
    } else {
      body = {
        roomId: data.roomId,
        pet_name: currentPet,
        bookingId: 1,
        checkIn: new Date(`${formData.entryDate}T00:00:00.00Z`),
        checkOut: new Date(`${formData.exitDate}T00:00:00.00Z`),
      };

      createBookedRoom(body, localStorage.getItem("token"))
        .then((res) => {
          if (res.success) {
            createNotification(
              "success",
              "Booking success",
              "Create booking successfully."
            );
          } else {
            createNotification("fail", "Booking fail", res.msg);
          }
        })
        .then(() => changeBookingBarStatus());
    }
  };

  //  change BookingStatus when formData and currentPet is changed
  //  @constraint: if data is not fully filled Notify warning
  //  @constraint: if available Notify success
  //  @constraint: if not available Notify fail
  const changeBookingBarStatus = () => {
    if (
      !formData.entryDate ||
      (!formData.exitDate && !formData.entryTime) ||
      !validDateStatus.status
    ) {
      setStatus("date is invalid");
      return;
    }

    if (data.headerType == "Service") {
      getServiceStatusAPI(
        data.name,
        `${formData.entryDate}T${formData.entryTime}:00.00Z`
      ).then((res) => {
        setSize(res.count);
        res.count < 3
          ? setStatus("room available")
          : setStatus("room not available");
      });
    } else {
      fetchRoomStatusAPI(
        data.roomId,
        formData.entryDate,
        formData.exitDate,
        localStorage.getItem("token")
      ).then((res) => {
        setSize(res.count);
        res.count < data.maxsize
          ? setStatus("room available")
          : setStatus("room not available");
      });
    }
  };

  //  handleStarSelect changed
  const handleCommentStarSelect = useCallback((star) => {
    setCommentStarSelect(star);
  }, []);

  // call changeBookingBarStatus when formData is changed
  useEffect(() => {
    changeBookingBarStatus();
  }, [formData]);

  // fetch API to get petname
  useEffect(() => {
    if (!user) return;

    if (data.headerType == "Service") {
      fetchAllPetAPI(user.customer.id, "name").then((pets) =>
        setPetData(pets.data)
      );
    } else {
      fetchAvailablePetAPI(user.customer.id, "name").then((pets) =>
        setPetData(pets.data)
      );
    }
    setCurrentPage(1);
  }, [user]);

  // fetch new comment data when currentPage change
  useEffect(() => {
    if (data) {
      if (data.headerType == "Service") {
        fetchServiceCommentsAPI(data.name).then(
          (comments) => {
            if (comments.success) {
              console.log(comments);
              setCommentStatus(true);
              comments.data.forEach((comment) => {
                console.log(comment)
                comment.comment_star = comment.commenter_star.toFixed(1);
              });
              setComments(comments.data);
            } else {
              setCommentStatus(false);
              setComments([]);
            }
          }
        );
      } else {
        fetchRoomWithCommentAPI(
          data.roomId,
          commentStarSelect,
          currentPage
        ).then((comments) => {
          if (comments.success) {
            setCommentStatus(true);
            comments.data.forEach((comment) => {
              comment.comment_star = comment.commenter_star.toFixed(1);
            });
            setComments(comments.data);
          } else {
            setCommentStatus(false);
            setComments([]);
          }
        }); 
      }
    }
  }, [data, currentPage, commentStarSelect]);

  return (
    <div className="w-1/2 bg-white rounded-3xl p-8 border-2 border-[var(--brown-color)] overflow-hidden">
      {/* header dataial section */}
      <section className="my-5 flex justify-between">
        <div className="w-2/3">
          <p className="text-2xl mb-2 font-bold">
            {data.headerType}{" "}
            {popupStatus
              ? data.headerType == "Service"
                ? data.name
                : data.roomId.toString().padStart(3, 0)
              : null}
          </p>
          <div className="text-xl mb-2 flex gap-1 items-center">
            Status{" "}
            <motion.div
              layout
              animate={{
                backgroundColor:
                  status == "date is invalid"
                    ? "var(--warning-color)"
                    : status == "room available"
                    ? "var(--success-color)"
                    : "var(--fail-color)",
              }}
              className={`inline-block rounded-full h-4 w-4 ml-1 border-2`}
            ></motion.div>
            <motion.span layout className="text-sm italic">
              {status}
            </motion.span>
          </div>
          {popupStatus ? (
            data.headerType == "Service" ? (
              data.forWhich.map((type, idx) => {
                return (
                  <p key={idx} className="text-xl mb-2">
                    Suitable for {type}
                  </p>
                );
              })
            ) : (
              <p className="text-xl mb-2">Suitable for {data.forWhich}</p>
            )
          ) : null}
        </div>
        <div className="w-1/3 flex flex-col justify-between items-end">
          {data.headerType === "Service" ? (
            <motion.p className="text-center py-2 px-4 bg-[var(--light-brown-color)] rounded">
              {size} / 3
            </motion.p>
          ) : (
            <div />
          )}
          <p className="text-2xl font-bold">{data.price} ฿</p>
        </div>
      </section>
      <hr />
      {/* header dataial section */}

      {/* booking detail section */}
      <section className="py-5 px-4">
        <div className="flex items-center justify-start gap-4 mb-2">
          <b className="text-3xl block ">Your pet </b>
          <motion.i
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0 },
              backgroundColor: "var(--brown-color)",
            }}
            onClick={() => {
              navigate("/profile/pet");
              onClick([], false);
            }}
            className="text-xl bi bi-plus inline-flex justify-center items-center cursor-pointer bg-[var(--dark-brown-color)] rounded-full !text-white"
          ></motion.i>
        </div>
        <div className="relative">
          <select
            onChange={(e) => setCurrentPet(e.target.value)}
            className="inline-block mb-4 w-full rounded-xl px-4 py-2 text-2xl my-2 outline-0 bg-[var(--light-brown-color)] appearance-none cursor-pointer"
          >
            <option value="">Pick pet</option>
            {petData.map((data, idx) => {
              return (
                <option key={idx} value={data.name}>
                  {data.name} ({data.type})
                </option>
              );
            })}
          </select>
          <i className="bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-2/3 flex justify-center items-center text-2xl !text-white cursor-pointer pointer-events-none"></i>
        </div>
        <form onSubmit={handleFormSubmit}>
          <b className="mb-2 text-3xl inline-block w-1/2 ">Entry date</b>
          {data.headerType == "Service" ? (
            <>
              <b className="mb-2 text-3xl inline-block w-1/2">Entry time</b>
            </>
          ) : (
            <>
              <b className="mb-2 text-3xl inline-block w-1/2">Exit date</b>
            </>
          )}
          <div className="relative mb-4 w-full rounded-xl text-2xl bg-[var(--light-brown-color)] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-2/4 before:border-1  before:border-[var(--dark-brown-color)]">
            <input
              type="date"
              className="relative w-1/2 rounded-2xl px-4 py-2 text-2xl outline-0 cursor-pointer"
              onChange={(e) => handleFormDataChange(e, setFormData)}
              name="entryDate"
            />
            <i className="bi bi-caret-down-fill absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white pointer-events-none"></i>
            {data.headerType === "Service" ? (
              <>
                <select
                  className="relative w-1/2 rounded-2xl px-4 py-2 text-2xl outline-0 cursor-pointer appearance-none"
                  name="entryTime"
                  onChange={(e) => handleFormDataChange(e, setFormData)}
                >
                  <option value="">Pick time</option>
                  {selectableTime.map((time, idx) => {
                    return (
                      <option key={idx} value={time}>
                        {time}
                      </option>
                    );
                  })}
                </select>
              </>
            ) : (
              <>
                <input
                  type="date"
                  className="relative w-1/2 rounded-2xl px-4 py-2 text-2xl outline-0 cursor-pointer"
                  onChange={(e) => handleFormDataChange(e, setFormData)}
                  name="exitDate"
                />
              </>
            )}
            <i className="bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white pointer-events-none"></i>
          </div>
          {/* booking detail section */}

          <button
            type="submit"
            className={
              "mt-2 block w-full bg-[var(--dark-brown-color)] rounded !text-white text-center py-1 text-3xl mb-4 cursor-pointer hover:scale-105 transition-all duration-200"
            }
          >
            BOOK
          </button>
        </form>
      </section>
      <hr />

      {/* comment section */}
      <section>
        <b className="my-5 text-3xl block">
          {data.reviewStar}/5.0{" "}
          <i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i>
        </b>
        <div className="my-5 grid grid-cols-3 gap-2 bg-[var(--light-brown-color)]  p-2">
          {[null, 5, 4, 3, 2, 1].map((star) => {
            return (
              <CommentStarSelector
                style={`${
                  commentStarSelect === star
                    ? "bg-[var(--cream-color)]"
                    : "bg-white"
                }`}
                key={star}
                star={star}
                commentStarSelect={commentStarSelect}
                onClick={handleCommentStarSelect}
              />
            );
          })}
        </div>

        <div className="my-5 flex gap-3 flex-col h-[400px]">
          <AnimatePresence mode="popLayout">
            {commentStatus ? (
              <motion.div
                key="comments-container"
                variants={notification}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full flex flex-col justify-between"
              >
                <div className="h-full flex flex-col gap-2">
                  <AnimatePresence mode="popLayout">
                    {comments.map((comment, index) => {
                      return (
                        <CommentCard
                          variants={notification}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          key={`${comment.id || index}`}
                          user={comment.commenter_name}
                          star={comment.comment_star}
                          detail={comment.comment_detail}
                        />
                      );
                    })}
                  </AnimatePresence>
                </div>
                <Pagination
                  id={data.headerType == "Service" ? data.name : data.roomId}
                  pageAmount={data.commentPages}
                  currentPage={currentPage}
                  onClick={setCurrentPage}
                />
              </motion.div>
            ) : (
              <motion.p
                key="no-reviews"
                variants={startUpVariants}
                initial="hidden"
                animate="found"
                exit="exit"
                className="text-xl w-full text-center !text-[var(--brown-color)] italic my-auto"
              >
                No reviews found.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>
      {/* comment section */}
    </div>
  );
};

export default BookingBar;
