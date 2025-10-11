// BookingComp.js
import { AnimatePresence } from "motion/react";
import {  useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { deleteBookedService } from "../../../hooks/bookedServiceAPI";
import { fetchMyBookings } from "../../../hooks/bookingAPI"; // Import cancelBooking
import { overlay, popUP, startUpVariants } from "../../../styles/animation";
import { removeWindowScroll } from "../../../utils/handlePopup";
import Overlay from "../../Overlay";
import CancelModal from "../CancelModal";
import SuccessMessage from "../SuccessMessage";
import BookingCard from "./BookingCard";

const BookingComp = () => {
  const { user, setUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [allBookedService, setAllBookedService] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cancelledBooking, setCanceledBooking] = useState(null);

  useEffect(() => {
    if (!user) return;
    const getMyBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const data = await fetchMyBookings(token);
        console.log(data);
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
              bgColor="black"
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
