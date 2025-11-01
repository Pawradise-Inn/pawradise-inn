import { motion } from "framer-motion";
import { getStatusColor } from "../staff/StatusUtils";

const Tooltip = () => {
  return (
    <div className="relative group w-full">
      <div>[Children Placeholder]</div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--light-brown-color)] text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md">
        [Tooltip Text Placeholder]
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--light-brown-color)]"></div>
      </div>
    </div>
  );
};

const PaymentCard = ({ picture, username, bookingDetails, totalPrice, status }) => {
  const statusColor = getStatusColor(status) || "bg-green-500";

  let circleColor = "bg-green-500"; // default Success
  if (status === "Failed") circleColor = "bg-red-500";
  else if (status === "Cancelled") circleColor = "bg-gray-400";

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
      <div
        className={`absolute top-4 right-4 py-1 px-3 rounded-full ${statusColor} text-white flex items-center space-x-2 z-[999] shadow-lg`}
      >
        <div className={`w-3 h-3 rounded-full ${circleColor}`}></div>
        <span className="text-sm font-semibold tracking-wide">{status}</span>
      </div>
    </motion.div>
  );
};

export default PaymentCard;
