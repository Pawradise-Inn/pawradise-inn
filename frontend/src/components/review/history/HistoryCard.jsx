import testImg from "../../../assets/test.png";
import { motion } from "framer-motion";

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

const HistoryCard = ({ data, onClick, ...motionProps }) => {

  return (
    <motion.div className="flex rounded-2xl bg-[var(--cream-color)] p-4 mt-6 shadow relative" {...motionProps}>
      {data.status ? (
        <div className="absolute w-4 h-4 rounded-full bg-[var(--fail-color-alpha)] top-0 right-0 z-10 -translate-y-1/3 translate-x-1/3" />
      ) : null}
      <img
        src={testImg}
        className="w-40 h-40 object-cover object-center rounded-lg"
      />
      <div className="flex justify-between items-cente w-full mx-10">
        <div className="flex flex-col gap-2 justify-center items-start">
          {data.type === "Service" ? (
            <b>service: {data.name}</b>
          ) : (
            <b>room: {data.name}</b>
          )}
          <p>pet name: {data.petName}</p>
          <p>finish date: {data.date}</p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-start w-2/10">
          <Tooltip text={data.staffName}>
            <p className="truncate w-full">Done by: {data.staffName}</p>
          </Tooltip>
          <Tooltip text={data.staffReply}>
            <p className="truncate w-full">Reply by: {data.staffReply}</p>
          </Tooltip>
          <button onClick={onClick} className="py-2 px-12 rounded-xl bg-[var(--dark-brown-color)] !text-white cursor-pointer transition-all duration-200 active:scale-90">
            edit
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryCard;
