// this file still have to fetch userId from token

import CommentCard from "./CommentCard";
import "../../styles/bookingBarStyle.css";
import { useEffect, useState, useMemo, useCallback } from "react";
import CommentStarSelector from "./CommentStarSelector";
import Pagination from "./Pagination";
import { getDateValidation } from "../../utils/handleValidation";
import { handleFormDataChange } from "../../utils/handleForm";
import { fetchAllPetAPI, fetchAvailablePetAPI } from "../../hooks/petAPI";
import { fetchServiceReviewAPI } from "../../hooks/serviceAPI";
import { fetchRoomWithCommentAPI } from "../../hooks/roomAPI";
import { createBookedRoom } from "../../hooks/bookedRoomAPI";
import { createBookedService } from "../../hooks/bookedServiceAPI";

// data: { image, name, review, forwhich, price, size, maxsize, headerType } of service and room

const BookingBar = ({ data, popupStatus }) => {
  const selectableTime = ["08:00", "10:00", "12:00", "14:00", "16:00"];

  const [commentStarSelect, setCommentStarSelect] = useState(6);
  const [currentPage, setCurrentPage] = useState(data.currentPage);
  const [comments, setComments] = useState([]);
  const [commentStatus, setCommentStatus] = useState(false);
  const [status, setStatus] = useState("--");
  const [currentPet, setCurrentPet] = useState(null);
  const [petData, setPetData] = useState([]);
  const [formData, setFormData] = useState({
    entryDate: " ",
    exitDate: "z",
    entryTime: "",
  });

  //  status using for display error when meet constraint
  const validDateStatus = useMemo(() => {
    return getDateValidation(formData.entryDate, formData.exitDate);
  }, [formData]);

  const handleCommentStarSelect = useCallback((star) => {
    setCommentStarSelect(star);
  }, []);

  // handle form submit and check availability and validation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validDateStatus.status) {
      alert("Invalid date detecting");
      return;
    }

    if (!currentPet) {
      alert("Please select your pet before booking");
      return;
    }

    let body;
    if (data.headerType === "Service") {
      if (!formData.entryTime) {
        alert("Please select time before booking");
        return;
      }
      body = {
        service_name: data.name,
        pet_name: currentPet,
        bookingId: 1,
        scheduled: new Date(
          `${formData.entryDate}T${formData.entryTime}:00.00Z`
        ),
      };

      createBookedService(body).then((res) => {
        if (res.success) {
          alert("Create reservation successfully");
        } else {
          alert(res.msg);
        }
      });
    } else {
      body = {
        roomId: data.roomId,
        pet_name: currentPet,
        bookingId: 1,
        checkIn: new Date(`${formData.entryDate}T00:00:00.00Z`),
        checkOut: new Date(`${formData.exitDate}T00:00:00.00Z`),
      };

      createBookedRoom(body).then((res) => {
        if (res.success) {
          alert("Create reservation successfully");
        } else {
          alert(res.msg);
        }
      });
    }
  };

  // fetch new status when date or time change
  const fetchNewStatus = () => {
    // fetch new data from backend API here
    // fetch new data from backend API here
    // fetch new data from backend API here
    // fetch new data from backend API here
    // fetch new data from backend API here
    // fetch new data from backend API here
  };

  // fetch API to get petname
  useEffect(() => {
    if (data.headerType == "Service") {
      fetchAllPetAPI(9, "name").then((pets) => setPetData(pets.data));
    } else {
      fetchAvailablePetAPI(9, "name").then((pets) => setPetData(pets.data));
    }
  }, []);

  // fetch new comment data when currentPage change
  useEffect(() => {
    if (data.length != 0) {
      if (data.headerType == "Service") {
        fetchServiceReviewAPI(data.name, currentPage).then((comments) => {
          if (comments.success) {
            setCommentStatus(true);
            comments.data.forEach((comment) => {
              comment.comment_star = comment.comment_star.toFixed(1);
            });
            setComments(comments.data);
          } else {
            setCommentStatus(false);
            setComments([]);
          }
        });
      } else {
        fetchRoomWithCommentAPI(data.roomId, currentPage).then((comments) => {
          if (comments.success) {
            setCommentStatus(true);
            comments.data.forEach((comment) => {
              comment.comment_star = comment.comment_star.toFixed(1);
            });
            setComments(comments.data);
          } else {
            setCommentStatus(false);
            setComments([]);
          }
        });
      }
    }
  }, [data, currentPage]);

  // reset currentPage to 1 when this bookingBar data is change(reopen)
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <div className="w-1/2 bg-white rounded-3xl p-8 border-2 border-[var(--brown-color)] ">
      {/* header dataial section */}
      <section className="my-5 flex justify-between">
        <div className="w-1/2">
          <p className="text-2xl mb-2 font-bold">
            {data.headerType}{" "}
            {popupStatus
              ? data.headerType == "Service"
                ? data.name
                : data.roomId.toString().padStart(3, 0)
              : null}
          </p>
          <p className="text-xl mb-2">Status {status}</p>
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
        <div className="w-1/2 flex flex-col justify-end items-end">
          <p className="text-2xl font-bold">{data.price} ฿</p>
        </div>
      </section>
      <hr />
      {/* header dataial section */}

      {/* booking detail section */}
      <section className="py-5 px-4">
        <b className="text-3xl block mb-2">Your pet</b>
        <div className="relative">
          <select
            onChange={(e) => setCurrentPet(e.target.value)}
            className="inline-block mb-4 w-full rounded-xl px-4 py-2 text-2xl my-2 outline-0 bg-[var(--light-brown-color)] appearance-none cursor-pointer"
          >
            <option value={null}>Pick pet</option>
            {petData.map((data, idx) => {
              return (
                <option key={idx} value={data.name}>
                  {data.name}
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
              required
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
                  required
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

          {/* validation for booking */}
          <span className="text-center block w-full mt-8">
            <i className="!text-[var(--fail-color)]">
              {validDateStatus.warningText}
            </i>
          </span>
          {/* validation for booking */}

          <button
            type="submit"
            className={`${
              validDateStatus.status ? "mt-13" : "mt-2"
            } block w-full bg-[var(--dark-brown-color)] rounded !text-white text-center py-1 text-3xl mb-4 cursor-pointer hover:scale-105 transition-all duration-200`}
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
        <div className="my-5 grid grid-cols-5 gap-2 bg-[var(--light-brown-color)]  p-2">
          {[6, 5, 4, 3, 2, 1, 0].map((star) => {
            return (
              <CommentStarSelector
                style={`${
                  commentStarSelect === star
                    ? "bg-[var(--cream-color)] outline-2"
                    : "bg-white"
                }`}
                key={star}
                star={star}
                // commentStarSelect={commentStarSelect}
                onClick={handleCommentStarSelect}
              />
            );
          })}
        </div>
        <div className="my-5 flex gap-3 flex-col">
          {commentStatus ? (
            <>
              {comments.map((comment, index) => {
                return (
                  <CommentCard
                    key={index}
                    user={comment.commenter_name}
                    star={comment.comment_star}
                    detail={comment.comment_detail}
                  />
                );
              })}
              <Pagination
                id={data.headerType == "Service" ? data.name : data.roomId}
                pageAmount={data.commentPages}
                currentPage={currentPage}
                onClick={setCurrentPage}
              />
            </>
          ) : (
            <p className="text-xl w-full my-10 text-center !text-[var(--brown-color)] italic">
              No reviews found.
            </p>
          )}
        </div>
      </section>
      {/* comment section */}
    </div>
  );
};

export default BookingBar;
