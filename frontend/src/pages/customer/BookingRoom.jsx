import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import BookingPopup from "../../components/booking/BookingPopup";
import { useNotification } from "../../context/notification/NotificationProvider";
import Overlay from "../../components/Overlay";
import RoomCard from "../../components/room/RoomCard";
import {
  fetchAllRoomsWithPaginationAPI,
  fetchAvailableRoomsAPI,
} from "../../hooks/roomAPI";
import { overlay, popUP, startUpVariants } from "../../styles/animation";
import { removeWindowScroll } from "../../utils/handlePopup";
import { getDateValidation } from "../../utils/handleValidation";
import DropDownList from "../../components/DropDownList";
import "react-datepicker/dist/react-datepicker.css";
import DateDropDown from "../../components/DateDropDown";
import { fetchPetTypesAPI } from "../../hooks/petAPI";

const BookingRoom = () => {
  const { createNotification } = useNotification();
  const [petTypes, setPetTypes] = useState([null]);
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

  const CheckInRef = forwardRef(({ value, onClick, className }, ref) => (
    <button type="button" ref={ref} onClick={onClick} className={className}>
      {value || "mm/dd/yyyy"}
    </button>
  ));

  const CheckOutRef = forwardRef(({ value, onClick, className }, ref) => (
    <button type="button" ref={ref} onClick={onClick} className={className}>
      {value || "mm/dd/yyyy"}
    </button>
  ));

  //   if filter.petType is not null return data with filter with petType else return data itself back
  //   @params: filteredRoom -> data that want to filter
  //  @return: filteredRoom with filtered with petType or not filter if petType is null
  const filterWithPet = (filteredRoom) => {
    if (filter.petType) {
      return filteredRoom.filter((r) => r.forWhich === filter.petType);
    }
    return filteredRoom;
  };

  // fetch room data from backend and setRoom
  useEffect(() => {
    const loadInitialRooms = async () => {
      try {
        const roomsData = await fetchAllRoomsWithPaginationAPI();
        roomsData.data.forEach((room) => {
          room.headerType = "Room";
          room.reviewStar = room.reviewStar.toFixed(1);
        });
        console.log(roomsData);
        setRoom(roomsData.data);
      } catch (error) {
        console.error("Failed to load initial rooms:", error);
      }
    };

    const loadInitialPetTypes = async () => {
      try {
        const petTypesData = await fetchPetTypesAPI();
        setPetTypes([null, ...petTypesData.data]);
      } catch (error) {
        console.error("Failed to load initial pet types:", error);
      }
    };
    loadInitialRooms();
    loadInitialPetTypes();
  }, []);

  // if entryDate and exitDate is fill select 2 route
  //   1) if petType === null filterRoom = []
  //   2) if petType !== null call API and store in filterRoom
  // if entryDate and exitDate isn't fill filterRoom = Room
  useEffect(() => {
    const filterRooms = async () => {
      if (filter.entryDate && filter.exitDate) {
        const validatedDate = getDateValidation(
          filter.entryDate,
          filter.exitDate
        );
        if (validatedDate.status) {
          try {
            const availableRooms = await fetchAvailableRoomsAPI(
              filter.entryDate,
              filter.exitDate
            );
            setFilterRoom(filterWithPet(availableRooms.data));
          } catch (error) {
            console.error("Failed to fetch available rooms:", error);
            setFilterRoom([]);
            // Interceptor handles the fail notification.
          }
        } else {
          // FIXED: Changed createNotification to use the new object style.
          createNotification(
            "fail",
            "Date is invalid",
            validatedDate.warningText
          );
          setFilterRoom([]);
        }
      } else {
        setFilterRoom(filterWithPet(room));
      }
    };

    filterRooms();
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
        className="m-8 relative flex justify-center content-between border-2 border-[var(--brown-color)] rounded-xl mx-auto w-8/10 max-w-[800px] pb-4 before:content-[''] before:w-px before:h-3/4 before:absolute before:top-1/2 before:left-3/10 before:-translate-x-1/2 before:-translate-y-1/2 before:border-1 before:border-[var(--brown-color)]"
      >
        <div className="flex flex-col justify-start items-center gap-6 w-3/10 py-4 px-8">
          <p className="text-xl font-bold">Pet type</p>
          <DropDownList
            startText="-- Select --"
            options={petTypes.map((type) => {
              if (type === null) return { name: "-- Select --", value: null };
              return { name: type, value: type };
            })}
            onChange={(value) => {
              setFilter((prev) => ({ ...prev, petType: value }));
              setMounted(true);
            }}
            value={filter.petType}
            arrowColor="white"
            inputSyle="!text-white px-4 py-2 outline-0 text-xl bg-(--brown-color) rounded-lg"
            element="selectPetType"
          />
        </div>
        <div className="flex flex-col justify-start items-center gap-6 w-7/10 py-4 px-8">
          <p className="text-xl font-bold">Booking date</p>
          <div className="relative w-full rounded-xl bg-[var(--brown-color)] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-2/4 before:border-1 before:border-white">
            <div className="relative w-1/2 inline-block">
              <DateDropDown
                value={filter.entryDate}
                onChange={(date) =>
                  setFilter((prev) => ({ ...prev, entryDate: date }))
                }
                onFocus={() => setMounted(true)}
                customInput={
                  <CheckInRef className="w-full !text-white rounded-2xl px-4 py-2 text-xl outline-0 cursor-pointer text-start" />
                }
              />
            </div>
            <div className="relative w-1/2 inline-block">
              <DateDropDown
                value={filter.exitDate}
                onChange={(date) =>
                  setFilter((prev) => ({ ...prev, exitDate: date }))
                }
                onFocus={() => setMounted(true)}
                customInput={
                  <CheckOutRef className="w-full !text-white rounded-2xl px-4 py-2 text-xl outline-0 cursor-pointer text-start" />
                }
              />
            </div>
          </div>
        </div>
      </motion.form>

      {noResult ? (
        <AnimatePresence mode="popLayout">
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
                  key={`room-${data.id}`}
                  data={data}
                  onClick={handlePopUpData}
                />
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence mode="popLayout" initial={true}>
        {popUpStatus ? (
          <div>
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
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default BookingRoom;
