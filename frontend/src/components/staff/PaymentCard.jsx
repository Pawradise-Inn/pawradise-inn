import { motion } from "framer-motion";
import { getStatusColor } from "../staff/StatusUtils";

const Tooltip = () => {
  return (
    <div className="relative group w-full">
      <div>[Children Placeholder]</div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--light-brown-color)] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        [Tooltip Text Placeholder]
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--light-brown-color)]"></div>
      </div>
    </div>
  );
};

const PaymentCard = () => {
  return (
    <motion.div
      className="flex rounded-2xl bg-[var(--cream-color)] p-4 mt-6 shadow relative w-full mx-2"
    >
      <img
        src="[Image URL Placeholder]"
        className="w-40 h-40 object-cover object-center rounded-lg"
        alt="Service"
      />
      <div className="flex justify-between items-center w-full mx-10">
        <div className="flex flex-col gap-2 justify-center items-start">
          <b>[Username]</b>
          <div>list of service and room with date and time</div>
          <div>list of service and room with date and time</div>
          <div>list of service and room with date and time</div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-lg font-bold">
        Total Price: $$$
      </div>

      {/* Payment Status Box */}
      <div className="absolute top-4 right-4 py-1 px-3 rounded-full bg-[var(--dark-brown-color)] text-white flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
        <span>payment status</span>
      </div>
    </motion.div>
  );
};

export default PaymentCard;