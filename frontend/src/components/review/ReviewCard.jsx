import { motion } from "framer-motion";
import { getStatusColor } from "../staff/StatusUtils";

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group w-full">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--light-brown-color)] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {text}
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--light-brown-color)]"></div>
      </div>
    </div>
  );
};

const ReviewCard = ({ data, onClick, type, ...motionProps }) => {
  const getDateBlock = (dateWithTime) => {
    const [date, time] = dateWithTime.replace(".000Z", "").split("T");
    return (
      <div className="inline-block">
        <span className={`py-1 px-3 rounded-xl mr-2 ${getStatusColor("IDLE")}`}>
          {date}
        </span>
        <span className={`py-1 px-3 rounded-xl mr-2 ${getStatusColor("IDLE")}`}>
          {time}
        </span>
      </div>
    );
  };
  return (
    <motion.div
      className="flex rounded-2xl bg-[var(--cream-color)] p-4 mt-6 shadow relative"
      {...motionProps}
    >
      <img
        src={data.pic}
        className="w-40 h-40 object-cover object-center rounded-lg"
        alt="Service"
      />
      <div className="flex justify-between items-center w-full mx-10">
        <div className="flex flex-col gap-2 justify-center items-start">
          {type === "Service" ? (
            <b>service: {data.serviceName}</b>
          ) : (
            <b>room: {data.roomName}</b>
          )}
          <p>pet name: {data.petName}</p>
          <div>finish date: {getDateBlock(data.date)}</div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-start w-2/10">
          <Tooltip text={data.staffName}>
            <p className="truncate w-full">Done by: {data.staffName}</p>
          </Tooltip>
          <button
            onClick={onClick}
            className="py-2 px-12 rounded-xl bg-[var(--dark-brown-color)] !text-white cursor-pointer transition-all duration-200 active:scale-90"
          >
            review
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
