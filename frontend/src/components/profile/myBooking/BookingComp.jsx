// BookingComp.js
import { useEffect, useState } from "react";
import SuccessMessage from "../SuccessMessage";
import CancelModal from "../CancelModal";
import { useOutletContext } from "react-router-dom";
import {
  fetchMyBookings,
  cancelBooking,
  updateBooking,
} from "../../../hooks/bookingAPI"; // Import cancelBooking
import { deleteBookedService } from "../../../hooks/bookedServiceAPI";
import { startUpVariants, overlay, popUP } from "../../../styles/animation";
import BookingCard from "./BookingCard";
import { motion, AnimatePresence } from "motion/react";
import Overlay from "../../Overlay";
import { removeWindowScroll } from "../../../utils/handlePopup";

const BookingComp = () => {
  const { user, setUser } = useOutletContext();
  const [showModal, setShowModal] = useState(false);
  const [allBookedService, setAllBookedService] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cancelledBooking, setCanceledBooking] = useState(null);

  useEffect(() => {
    const getMyBookings = async () => {
      try {
        const data = await fetchMyBookings(1);
        // Flatten all booked_service into one array
        const allServices = data.data.flatMap((book) => book.booked_service);
        setAllBookedService(allServices);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    getMyBookings();
  }, []);

  const handleCancelClick = (book) => {
    setSelectedBooking(book);
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    try {
      deleteBookedService(selectedBooking.id);
      const filterBookingService = allBookedService.filter(
        (ab) => ab.id != selectedBooking.id
      );
      setAllBookedService(filterBookingService);
      setCanceledBooking(selectedBooking);
      setShowModal(false);
      setSelectedBooking(null);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      // Handle the error, maybe show an error message to the user
      setShowModal(false);
      setSelectedBooking(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  removeWindowScroll(showModal);

  return (
    <div>
      <SuccessMessage
        show={showSuccessMessage}
        booking={cancelledBooking}
        onClose={handleCloseSuccessMessage}
      />

      {allBookedService.map((book, idx) => {
        return (
          <BookingCard
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={idx / 3 + 1}
            key={book.id}
            book={book}
            onCancelClick={(book) => handleCancelClick(book)}
          />
        );
      })}

      {/* Cancel Popup with overlay and animation */}
      <AnimatePresence initial={true}>
        {showModal ? (
          <>
            <Overlay
              variants={overlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
            <CancelModal
              variants={popUP}
              initial="hidden"
              animate="visible"
              exit="hidden"
              booking={selectedBooking}
              onConfirm={handleConfirmCancel}
              onCancel={handleCloseModal}
            />
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default BookingComp;
