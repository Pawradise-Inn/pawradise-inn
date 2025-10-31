// this file still have to fetch userId from token

import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { createBookedRoom } from "../../hooks/bookedRoomAPI";
import { createBookedService } from "../../hooks/bookedServiceAPI";
import { fetchCustomerPets, fetchAvailablePetAPI } from "../../hooks/petAPI";
import { fetchRoomStatusAPI, fetchRoomReviewsAPI } from "../../hooks/roomAPI";
import {
  fetchServiceReviewsAPI,
  getServiceStatusAPI,
} from "../../hooks/serviceAPI";
import { getDateValidation } from "../../utils/HandleValidation";
import { useNotification } from "../../context/notification/NotificationProvider";
import CommentCard from "./CommentCard";
import CommentStarSelector from "./CommentStarSelector";
import Pagination from "../Pagination";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { notification, startUpVariants } from "../../styles/animation";
import DropDownList from "../DropDownList";
import DateDropDown from "../DateDropDown";

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
    entryDate: null,
    exitDate: null,
    entryTime: null,
  });

  const CheckInRef = forwardRef(({ value, onClick, className }, ref) => (
    <div ref={ref}>
      <button type="button" onClick={onClick} className={className}>
        {value || "mm/dd/yyyy"}
      </button>
      {/* <i className="bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white pointer-events-none"></i> */}
    </div>
  ));

  const CheckOutRef = forwardRef(({ value, onClick, className }, ref) => (
    <div ref={ref}>
      <button type="button" onClick={onClick} className={className}>
        {value || "mm/dd/yyyy"}
      </button>
      {/* <i className="bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white pointer-events-none"></i> */}
    </div>
  ));

  const changeDateTime = (date, time) => {
    const hour = time.split(":")[0];

    date.setHours(Number(hour));
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  };

  //  calculate date is valid or not
  //  @return: validDateStatus which contain 1)status, 2)warningText
  const validDateStatus = useMemo(() => {
    if (!formData.entryDate || !formData.exitDate) return { status: true };
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
        scheduled: changeDateTime(formData.entryDate, formData.entryTime),
      };

      createBookedService(body)
        .then(() => changeBookingBarStatus())
        .catch((error) => {
          console.error("Booking service error:", error);
        });
    } else {
      body = {
        roomId: data.id,
        pet_name: currentPet,
        bookingId: 1,
        checkIn: formData.entryDate,
        checkOut: formData.exitDate,
      };

      createBookedRoom(body)
        .then(() => changeBookingBarStatus())
        .catch((error) => {
          console.error("Booking error:", error);
        });
    }
  };
  //  change BookingStatus when formData and currentPet is changed
  //  @constraint: if data is not fully filled Notify warning
  //  @constraint: if available Notify success
  //  @constraint: if not available Notify fail
  const changeBookingBarStatus = async () => {
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
        changeDateTime(formData.entryDate, formData.entryTime)
      ).then((res) => {
        setSize(res.message.details.count);
        res.message.details.count < 3
          ? setStatus("service available")
          : setStatus("service not available");
      });
    } else {
      fetchRoomStatusAPI(data.id, formData.entryDate, formData.exitDate).then(
        (res) => {
          setSize(res.message.details.count);
          res.message.details.count < data.maxsize
            ? setStatus("room available")
            : setStatus("room not available");
        }
      );
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
    const fetchPetData = async () => {
      if (!user) return;

      console.log("Fetching pet data for:", data.headerType);
      console.log("Using customer ID:", user.customer.id);
      try {
        let response;
        if (data.headerType === "Service") {
          response = await fetchCustomerPets(user.customer.id, [
            "name",
            "type",
          ]);
        } else {
          response = await fetchAvailablePetAPI(user.customer.id);
        }
        console.log("Pet data response:", response.data);
        setPetData(response.data);
      } catch (err) {
        console.error("Failed to fetch pet data:", err);
      }
    };

    fetchPetData();
  }, [user, data.headerType]);

  // fetch new comment data when currentPage change
  useEffect(() => {
    const fetchReviews = async () => {
      if (!data) return;
      try {
        let commentResponse;

        if (data.headerType === "Service") {
          commentResponse = await fetchServiceReviewsAPI(
            data.name,
            commentStarSelect,
            currentPage
          );
          console.log(commentResponse)
        } else {
          commentResponse = await fetchRoomReviewsAPI(
            data.id,
            commentStarSelect,
            currentPage
          );
        }

        setCommentStatus(commentResponse.data.length !== 0);
        commentResponse.data.forEach((comment) => {
          comment.comment_star = comment.comment_star.toFixed(1);
        });
        setComments(commentResponse.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setCommentStatus(false);
        setComments([]);
      }
    };

    fetchReviews();
  }, [data, currentPage, commentStarSelect]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data, commentStarSelect]);

  return (
    <div className="w-1/2 bg-white rounded-3xl p-8 border-2 border-[var(--brown-color)] overflow-hidden">
      {/* header dataial section */}
      <section className="my-5 flex justify-between">
        <div className="w-2/3">
          <p className="text-2xl mb-2 font-bold">
            {data.headerType}{" "}
            {popupStatus
              ? data.headerType == "Service"
                ? <span data-testid="name">{data.name}</span>
                : <span data-testid="name">{data.id.toString().padStart(3, 0)}</span>
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
              onClick(data, false);
            }}
            className="text-xl bi bi-plus inline-flex justify-center items-center cursor-pointer bg-[var(--dark-brown-color)] rounded-full !text-white"
          ></motion.i>
        </div>
        <div className="relative">
          <DropDownList
            startText="Pick pet"
            options={petData.map((pet) => ({
              name: `${pet.name} (${pet.type})`,
              value: pet.name,
            }))}
            onChange={(pet) => setCurrentPet(pet)}
            value={currentPet}
            mainStyle="mt-2 mb-4"
            element="bookingPickPet"
          />
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="w-1/2 mb-2 inline-block">
            <b className="text-3xl">Entry date</b>
          </div>
          {data.headerType == "Service" ? (
            <div className="w-1/2 mb-2 inline-block">
              <b className="text-3xl">Entry time</b>
            </div>
          ) : (
            <div className="w-1/2 mb-2 inline-block">
              <b className="text-3xl">Exit date</b>
            </div>
          )}
          <div className="grid grid-cols-2 relative mb-4 w-full rounded-xl text-2xl bg-[var(--light-brown-color)] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-2/4 before:border-1  before:border-[var(--dark-brown-color)]">
            <div className="w-full relative">
              <DateDropDown
                value={formData.entryDate}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, entryDate: date }))
                }
                customInput={
                  <CheckInRef className="relative w-full rounded-2xl px-4 py-2 text-2xl outline-0 cursor-pointer text-start" />
                }
              />
            </div>
            {data.headerType === "Service" ? (
              <DropDownList
                startText="Pick time"
                options={selectableTime.map((time) => ({
                  name: time,
                  value: time,
                }))}
                onChange={(time) =>
                  setFormData((prev) => {
                    return { ...prev, entryTime: time };
                  })
                }
                value={formData.entryTime}
                element="bookingPickTime"
                data-testid="pick-time"
              />
            ) : (
              <div className="w-full">
                <DateDropDown
                  value={formData.exitDate}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, exitDate: date }))
                  }
                  customInput={
                    <CheckOutRef className="relative w-full rounded-2xl px-4 py-2 text-2xl outline-0 cursor-pointer text-start" />
                  }
                />
              </div>
            )}
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
          {data.reviewStar} / 5.00{" "}
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
                  id={data.headerType == "Service" ? data.name : data.id}
                  pageAmount={
                    commentStarSelect
                      ? data.commentPages[commentStarSelect]
                      : data.commentPages.total
                  }
                  currentPage={currentPage}
                  onClick={setCurrentPage}
                  commentPerPage={3}
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
