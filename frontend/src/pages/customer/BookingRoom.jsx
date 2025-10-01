import { useState, useEffect, useCallback, useMemo } from "react";
import RoomCard from "../../components/room/RoomCard";
import BookingPopup from "../../components/BookingPopup";
import { motion, AnimatePresence } from "motion/react";
import { overlay, popUP, startUpVariants } from "../../styles/animation";
import { getDateValidation } from "../../utils/handleValidation";
import { handleFormDataChange } from "../../utils/handleForm";
import { fetchAllRoomsWithReviewsAPI } from "../../hooks/roomAPI";
import Overlay from "../../components/Overlay";
import { removeWindowScroll } from "../../utils/handlePopup";

const BookingRoom = () => {
  const petType = ["Dog", "Cat", "Bird", "Raccoon", "Fish  :)"];

  const [counti, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [room, setRoom] = useState([]);
  const [formData, setFormData] = useState({
    entryDate: " ",
    exitDate: "z",
    entryTime: "13:00",
    exitTime: "10:00",
  });
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

  // check if there is no result after filtering
  const noResult = useMemo(() => {
    if (room.length === 0) {
      return { status: false, warningText: "" };
    } else {
      return { status: true, warningText: "" };
    }
    // return getDateValidation(formData.entryDate, formData.exitDate);
  }, [formData, room]);

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
        className="m-8 relative flex justify-center content-between border-2 border-[var(--brown-color)] rounded-xl mx-auto w-6/10 max-w-[720px] pb-4 before:content-[''] before:w-px before:h-3/4 before:absolute before:top-1/2 before:left-3/10 before:-translate-x-1/2 before:-translate-y-1/2 before:border-1 before:border-[var(--brown-color)]"
      >
        <div className="flex flex-col justify-start items-center gap-6 w-3/10 py-4 px-8">
          <p className="text-xl font-bold">Pet type</p>
          <div className="relative mx-auto text-xl bg-[var(--brown-color)] rounded-lg w-full">
            <select
              onFocus={() => setMounted(true)}
              className="!text-white w-full  px-4 py-2 outline-0 appearance-none cursor-pointer"
            >
              {petType.map((type, idx) => {
                return (
                  <option className="bg-[var(--light-brown-color)]" key={idx}>
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
              onChange={(e) => handleFormDataChange(e, setFormData)}
              onFocus={() => setMounted(true)}
              name="entryDate"
            />
            <input
              required
              type="date"
              className="relative w-1/2 !text-white rounded-2xl px-4 py-2 text-xl outline-0 cursor-pointer"
              onChange={(e) => handleFormDataChange(e, setFormData)}
              onFocus={() => setMounted(true)}
              name="exitDate"
            />
          </div>
          <span className="text-center block w-full">
            <i className="!text-[var(--fail-color)]">{noResult.warningText}</i>
          </span>
        </div>
      </motion.form>

      {!noResult.status ? (
        <AnimatePresence>
          <motion.p
            variants={startUpVariants}
            initial="hidden"
            animate={mounted ? "found" : "visible"}
            exit="exit"
            className="text-2xl w-full text-center mt-32 italic"
          >
            Sorry, no available rooms match your desire.
          </motion.p>
        </AnimatePresence>
      ) : (
        <div className="m-8 grid grid-cols-2 gap-y-4 gap-x-8">
          <AnimatePresence mode="popLayout">
            {room.map((data, idx) => {
              return (
                <RoomCard
                  layout
                  variants={startUpVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                  custom={idx / 3 + 2}
                  key={idx}
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
