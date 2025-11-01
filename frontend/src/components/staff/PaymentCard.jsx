import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { getStatusColor } from "../staff/StatusUtils";

const PaymentCard = ({
  picture,
  username,
  bookingDetails,
  totalPrice,
  status,
  onStatusChange,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const popupRef = useRef(null);

  const statusColor = getStatusColor(currentStatus) || "bg-green-500";

  const getCircleColor = (statusValue) => {
    if (statusValue === "Success") return "bg-green-500";
    if (statusValue === "Failed") return "bg-red-500";
    if (statusValue === "Cancelled") return "bg-gray-400";
    return "bg-green-500";
  };

  const statusOptions = ["Success", "Failed", "Cancelled"];

  // close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div className="flex rounded-2xl bg-[var(--cream-color)] p-4 mt-6 shadow relative w-full mx-2">
      <img
        src={picture}
        className="w-40 h-40 object-cover object-center rounded-lg"
        alt={username}
      />
      <div className="flex justify-between items-center w-full mx-10">
        <div className="flex flex-col gap-2 justify-center items-start">
          <b>{username}</b>
          {bookingDetails.map((detail, index) => (
            <div key={index}>{detail}</div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-lg font-bold">
        Total Price: ${totalPrice}
      </div>

      {/* payment status */}
      <div className="absolute top-4 right-4 z-[999]" ref={popupRef}>
        <div className="relative">
          {/* status button */}
          <div
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className={`py-1 px-3 rounded-full ${statusColor} text-white flex items-center space-x-2 shadow-lg cursor-pointer`}
          >
            <div className={`w-3 h-3 rounded-full ${getCircleColor(currentStatus)}`}></div>
            <span className="text-sm font-semibold tracking-wide">{currentStatus}</span>
          </div>

          {/* popup */}
          {isPopupOpen && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-[var(--light-brown-color)] rounded shadow-lg">
              {statusOptions.map((option) => (
                <div
                  key={option}
                  className="flex items-center px-3 py-2 cursor-pointer hover:bg-[var(--brown-color)] text-white rounded space-x-2"
                  onClick={() => {
                    setCurrentStatus(option);
                    onStatusChange(option);
                    setIsPopupOpen(false);
                  }}
                >
                  <div className={`w-3 h-3 rounded-full ${getCircleColor(option)}`}></div>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentCard;
