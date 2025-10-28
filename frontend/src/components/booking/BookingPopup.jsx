import { motion } from "motion/react";
import BookingBar from "./BookingBar";
import testImage from "../../assets/test.png";

// data: data to be shown in popup
// onClick: function to close popup

const BookingPopup = ({ status, data, onClick, ...motionProps }) => {
  return (
    <motion.div
      className="fixed w-dvw h-dvh top-0 left-0  z-20 overflow-y-auto overflow-x-hidden"
      {...motionProps}
    >
      <div className="relative p-10 flex gap-4 w-8/10 max-w-7xl bg-white mx-auto my-10 rounded-3xl">
        <img
          src={data.image || testImage}
          alt="serviceImg"
          className="w-1/2 h-[580px] rounded-2xl object-center"
        />
        <BookingBar data={data} popupStatus={status} onClick={onClick} />
        <i
          onClick={() => onClick([], false)}
          className="bi bi-x-lg flex justify-center items-center absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-3xl cursor-pointer transition-all duration-200 hover:scale-125"
        ></i>
      </div>
    </motion.div>
  );
};

export default BookingPopup;