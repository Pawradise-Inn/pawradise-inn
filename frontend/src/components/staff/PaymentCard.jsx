import { motion } from "framer-motion";
import { getPaymentStatusColor } from "../staff/StatusUtils";
import DropDownList from "../DropDownList";

const PaymentCard = ({
  picture,
  username,
  bookingDetails,
  totalPrice,
  status,
  onStatusChange,
}) => {

  const statusColor = getPaymentStatusColor(status) || "bg-green-500";

  const statusOptions = [
    { name: "Success", value: "SUCCESS" },
    { name: "Failed", value: "FAILED" },
    { name: "Cancelled", value: "CANCELLED" },
  ];

  return (
    <motion.div layout 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }} 
      className="flex rounded-2xl bg-[var(--cream-color)] p-4 mt-6   relative w-full mx-2"
    >
      <img
        src={picture}
        className="w-40 h-40 object-cover object-center rounded-lg"
        alt={username}
      />
      <div className="flex justify-between items-center w-full mx-10">
        <div className="flex flex-col gap-2 justify-center items-start">
          <b>{username}</b>
          {Array.isArray(bookingDetails) && bookingDetails.length > 0 ? (
            bookingDetails.map((detail, index) => (
              <div key={index}>{detail}</div>
            ))
          ) : (
            <div className="opacity-60">No booking details</div>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-lg font-bold">
        Total Price: ${totalPrice}
      </div>

      {/* payment status */}
      <div className="absolute top-4 right-4 z-[999] ">
        <DropDownList
          options={statusOptions}
          value={status} 
          onChange={onStatusChange} 
          element={`status-dropdown-${username}`}
          inputSyle={`py-1 pl-3 pr-10 rounded-full ${statusColor} text-sm font-semibold tracking-wide cursor-pointer`}
          dropDownStyle="border-2 border-[var(--brown-color)] bg-[var(--light-brown-color)] origin-top translate-y-1 top-full right-0" // Aligns dropdown to the right
          activeColor="var(--cream-color)"
          // arrowColor="white" 
        />
      </div>
    </motion.div>
  );
};

export default PaymentCard;
