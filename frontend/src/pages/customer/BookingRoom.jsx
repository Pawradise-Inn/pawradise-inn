import { useState, useEffect, useCallback, useMemo } from "react";
import RoomCard from "../../components/room/RoomCard";
import BookingPopup from "../../components/BookingPopup";
import { motion, AnimatePresence } from "motion/react";
import { overlay, popUP, startUpVariants } from "../../styles/animation";
import { getDateValidation } from "../../utils/handleValidation";
import { handleFormDataChange } from "../../utils/handleForm";
import {
  fetchAllRoomsWithReviewsAPI,
  fetchAvailableRoomsAPI,
} from "../../hooks/roomAPI";
import Overlay from "../../components/Overlay";
import { removeWindowScroll } from "../../utils/handlePopup";
import { useNotification } from "../../components/notification/NotificationProvider";

const BookingRoom = () => {
  const petTypes = ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"];

  const { createNotification } = useNotification();
  const [mounted, setMounted] = useState(false);
  const [room, setRoom] = useState([]);
  const [filter, setFilter] = useState({
    petType: null,
    entryDate: null,
    exitDate: null,
  });
  const [filterRoom, setFilterRoom] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [popUpData, setPopUpData] = useState([]);

  // fetch room data from backend and setRoom
  useEffect(() => {
    fetchAllRoomsWithReviewsAPI().then((data) => {
      if (data.data) {
        data.data.forEach((room) => {
          room.headerType = "Room";
          room.reviewStar = room.reviewStar.toFixed(1);
          room.commentPages = Math.max(1, room.commentPages);
        });

        setRoom(data.data);
      }
    });
  }, []);

  // if entryDate and exitDate is fill select 2 route
  //   1) if petType === null filterRoom = []
  //   2) if petType !== null call API and store in filterRoom
  // if entryDate and exitDate isn't fill filterRoom = Room
  useEffect(() => {
    if (filter.entryDate && filter.exitDate) {
      const validatedDate = getDateValidation(
        filter.entryDate,
        filter.exitDate
      );
      if (validatedDate.status) {
        fetchAvailableRoomsAPI(
          filter.petType,
          filter.entryDate,
          filter.exitDate
        ).then((data) => {
          setFilterRoom(data.data);
        });
      } else {
        createNotification(
          "fail",
          "Date is invalid",
          validatedDate.warningText
        );
        setFilterRoom([]);
      }
    } else {
      setFilterRoom(room);
    }
  }, [filter, room]);

  //  if filterRoom is empty === no result
  useEffect(() => {
    if (filterRoom.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
  }, [filterRoom]);

  // handle popup data and status
  const handlePopUpData = useCallback((data, status) => {
    setPopUpStatus(status);
    setPopUpData(data);
  }, []);

  removeWindowScroll(popUpStatus);

  const test = () => {
    alert("hi");
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      {/* <button onClick={() => createNotification("success", "test", "test", test)}>success</button>
      <button onClick={() => createNotification("fail", "test", "test", test)}>fail</button>
      <button onClick={() => createNotification("warning", "test", "test", test)}>warning</button> */}
      <b className="text-7xl text-center block m-8 mt-0">
        {"Room Reservation".split(" ").map((word, idx) => {
          return (
            <motion.p
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={idx}
              key={idx}
            >
              {word}
            </motion.p>
          );
        })}
      </b>
      <motion.form
        variants={startUpVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="m-8 relative flex justify-center content-between border-2 border-[var(--brown-color)] rounded-xl mx-auto w-8/10 max-w-[800px] pb-4 before:content-[''] before:w-px before:h-3/4 before:absolute before:top-1/2 before:left-3/10 before:-translate-x-1/2 before:-translate-y-1/2 before:border-1 before:border-[var(--brown-color)]"
      >
        <div className="flex flex-col justify-start items-center gap-6 w-3/10 py-4 px-8">
          <p className="text-xl font-bold">Pet type</p>
          <div className="relative mx-auto text-xl bg-[var(--brown-color)] rounded-lg w-full">
            <select
              onFocus={() => setMounted(true)}
              onChange={(e) => handleFormDataChange(e, setFilter)}
              name="petType"
              className="!text-white w-full  px-4 py-2 outline-0 appearance-none cursor-pointer"
            >
              <option className="bg-[var(--light-brown-color)]" value="">
                -- Select --
              </option>
              {petTypes.map((type, idx) => {
                return (
                  <option
                    className="bg-[var(--light-brown-color)]"
                    value={type}
                    key={idx}
                  >
                    {type}
                  </option>
                );
              })}
            </select>
            <i className="bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white pointer-events-none"></i>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center gap-6 w-7/10 py-4 px-8">
          <p className="text-xl font-bold">Booking date</p>
          <div className="relative w-full rounded-xl bg-[var(--brown-color)] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-2/4 before:border-1 before:border-white">
            <input
              required
              type="date"
              className="relative w-1/2 !text-white rounded-2xl px-4 py-2 text-xl outline-0 cursor-pointer"
              onChange={(e) => handleFormDataChange(e, setFilter)}
              onFocus={() => setMounted(true)}
              name="entryDate"
            />
            <input
              required
              type="date"
              className="relative w-1/2 !text-white rounded-2xl px-4 py-2 text-xl outline-0 cursor-pointer"
              onChange={(e) => handleFormDataChange(e, setFilter)}
              onFocus={() => setMounted(true)}
              name="exitDate"
            />
          </div>
        </div>
      </motion.form>

      {noResult ? (
        <AnimatePresence>
          <motion.p
            variants={startUpVariants}
            initial="hidden"
            animate={mounted ? "found" : "visible"}
            exit="exit"
            className="text-2xl w-full text-center min-h-[220px] italic flex justify-center items-center"
          >
            Sorry, no available rooms match your desire.
          </motion.p>
        </AnimatePresence>
      ) : (
        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
          <AnimatePresence mode="popLayout">
            {filterRoom.map((data, idx) => {
              return (
                <RoomCard
                  layout
                  variants={startUpVariants}
                  initial="hidden"
                  animate={mounted ? "found" : "visible"}
                  exit="exit"
                  whileHover={{ scale: 1.05 }}
                  custom={idx / 3 + 2}
                  key={`room-${data.roomId}`}
                  data={data}
                  onClick={handlePopUpData}
                />
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence initial={true}>
        {popUpStatus ? (
          <>
            <Overlay
              variants={overlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
              bgColor="black"
            />
            <BookingPopup
              variants={popUP}
              initial="hidden"
              animate="visible"
              exit="hidden"
              status={popUpStatus}
              data={popUpData}
              onClick={handlePopUpData}
            />
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default BookingRoom;
