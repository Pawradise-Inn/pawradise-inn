import { motion } from "motion/react";
import { getStatusColor } from "../../../components/staff/StatusUtils";
import testImage from "../../../assets/test.png";
export const BookingServiceCard = ({ book, onCancelClick, ...motionProps }) => {
  return (
    <motion.div
      className="flex items-center bg-[var(--cream-color)] rounded-lg p-4 shadow-lg mb-6"
      {...motionProps}
    >
      <img
        src={book.service.picture || testImage}
        alt={book.pet.name || ""}
        className="w-50 h-50 rounded object-cover shadow mr-10"
      />
      {/* {Text info} */}
      <div className="flex-1 flex flex-col text-left">
        <div className="text-xl font-bold">{book.service.name || ""}</div>
        <div className="text-base mt-2 space-y-1">
          <p>
            <span className="text-lg">Pet Type: {book.pet.type || ""}</span>
          </p>
          <p>
            <span className="text-lg">Pet Name: {book.pet.name || ""}</span>
          </p>
          <p>
            <span className="text-lg">Status: {book.pet.status || ""}</span>
          </p>
        </div>
      </div>
      {/* {Action Button} */}
      <button
        onClick={() => onCancelClick(book)}
        className="px-4 py-2 bg-[var(--dark-brown-color)] text-lg rounded !text-[var(--cream-color)]
                        shadow cursor-pointer transition-transform duration-200 hover:scale-110 active:bg-[var(--brown-color)] active:scale-100"
      >
        cancel
      </button>
    </motion.div>
  );
};

export const BookingRoomCard = ({room, onCancelClick, ...motionProps}) => {
  const getDateBlock = (dateWithTime) => {
      const [date, time] = dateWithTime.replace(".000Z", "").split("T");
      return (
        <div>
          <span className={ `py-1 px-3 rounded-xl mr-2 ${getStatusColor("IDLE")}`}>{date}</span>
          <span className={ `py-1 px-3 rounded-xl mr-2 ${getStatusColor("IDLE")}`}>{time}</span>
        </div>
      );
    };
  return (
    <motion.div
      className="flex items-center bg-[var(--cream-color)] rounded-lg p-4 shadow-lg mb-6"
      {...motionProps}
    >
      <img
        src={room.room.picture || testImage}
        alt={room.roomId || ""}
        className="w-50 h-50 rounded object-cover shadow mr-10"
      />
      {/* {Text info} */}
      <div className="flex-1 flex flex-col text-left">
        <div className="text-xl font-bold">Room {room.roomId || ""}</div>
        <div className="text-base mt-2 space-y-1">
          <p>
            <span className="text-lg">Pet Type: {room.pet.type || ""}</span>
          </p>
          <p>
            <span className="text-lg">Pet Name: {room.pet.name || ""}</span>
          </p>
          <p>
            <span className="text-lg">Check In</span>
          </p>
          {getDateBlock(room.checkIn) || ""}
          <p>
            <span className="text-lg">Check Out</span>
          </p>
          {getDateBlock(room.checkOut) || ""}
        </div>
      </div>
      {/* {Action Button} */}
      <button
        onClick={() => onCancelClick(room)}
        className="px-4 py-2 bg-[var(--dark-brown-color)] text-lg rounded !text-[var(--cream-color)]
                        shadow cursor-pointer transition-transform duration-200 hover:scale-110 active:bg-[var(--brown-color)] active:scale-100"
      >
        cancel
      </button>
    </motion.div>
  );
};

