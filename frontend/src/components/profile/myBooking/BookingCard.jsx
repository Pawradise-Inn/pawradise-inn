import { motion } from "motion/react";
import { getStatusColor } from "../../staff/StatusUtils";
import testImage from "../../../assets/test.png";
import { genqrAPI } from "../../../hooks/qrAPI";
import { useState } from "react";

// Helper function to get status dot color (matching paymentcomponent.jsx style)
const getStatusDotColor = (status) => {
  switch (status) {
    case 'PENDING':
      return 'bg-[var(--warning-color)]';
    case 'RESERVED':
      return 'bg-[var(--room-reserved-color)]';
    case 'QUEUE':
      return 'bg-[var(--queue-color)]';
    case 'IN_PROGRESS':
      return 'bg-[var(--inProgress-color)]';
    case 'COMPLETED':
      return 'bg-[var(--complete-color)]';
    case 'CHECKED_IN':
      return 'bg-[var(--checkIn-color)]';
    case 'CHECKED_OUT':
      return 'bg-[var(--checkOut-color)]';
    case 'CANCELLED':
      return 'bg-[var(--fail-color)]';
    default:
      return 'bg-gray-400';
  }
};

// Helper function to get status text (capitalized)
const getStatusText = (status) => {
  if (!status) return "Unknown";
  // Convert status to readable format
  return status
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};

export const BookingServiceCard = ({ book, onCancelClick, ...motionProps }) => {
  if(!book.pet) return
  return (
    <motion.div
      className="flex items-center bg-[var(--cream-color)] rounded-lg p-4 shadow-lg mb-6 relative"
      {...motionProps}
    >
      {/* Status badge in top right corner - matching paymentcomponent.jsx style */}
      <div className="absolute top-4 right-4">
        <div 
          className="inline-flex items-center bg-[var(--dark-brown-color)] !text-[var(--cream-color)]
                     py-1.5 px-3 rounded-full text-sm font-medium capitalize"
        >
          <span className={`w-2.5 h-2.5 rounded-full mr-2 ${getStatusDotColor(book.status)}`}></span>
          {getStatusText(book.status)}
        </div>
      </div>
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
      {/* {Action Button} - positioned at bottom right */}
      <button
        onClick={() => onCancelClick(book)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-[var(--dark-brown-color)] text-lg rounded !text-[var(--cream-color)]
                        shadow cursor-pointer transition-transform duration-200 hover:scale-110 active:bg-[var(--brown-color)] active:scale-100"
      >
        cancel
      </button>
    </motion.div>
  );
};

export const BookingRoomCard = ({room, onCancelClick, ...motionProps}) => {
  if(!room.pet) return null;
  
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
      className="flex items-center bg-[var(--cream-color)] rounded-lg p-4 shadow-lg mb-6 relative"
      {...motionProps}
    >
      {/* Status badge in top right corner - matching paymentcomponent.jsx style */}
      <div className="absolute top-4 right-4">
        <div 
          className="inline-flex items-center bg-[var(--dark-brown-color)] !text-[var(--cream-color)]
                     py-1.5 px-3 rounded-full text-sm font-medium capitalize"
        >
          <span className={`w-2.5 h-2.5 rounded-full mr-2 ${getStatusDotColor(room.status)}`}></span>
          {getStatusText(room.status)}
        </div>
      </div>
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
            <span className="text-lg">Pet Type: {room.pet?.type || ""}</span>
          </p>
          <p>
            <span className="text-lg">Pet Name: {room.pet?.name || ""}</span>
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
      {/* {Action Button} - positioned at bottom right */}
      <button
        onClick={() => onCancelClick(room)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-[var(--dark-brown-color)] text-lg rounded !text-[var(--cream-color)]
                        shadow cursor-pointer transition-transform duration-200 hover:scale-110 active:bg-[var(--brown-color)] active:scale-100"
      >
        cancel
      </button>
    </motion.div>
  );
};