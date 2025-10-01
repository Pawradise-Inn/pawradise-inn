import { motion } from "motion/react";

const BookingCard = ({ book, onCancelClick, ...motionProps }) => {
  return (
    <motion.div
      className="flex items-center bg-[var(--cream-color)] rounded-lg p-4 shadow-lg mb-6"
      {...motionProps}
    >
      <img
        src={book.img}
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

export default motion.create(BookingCard);
