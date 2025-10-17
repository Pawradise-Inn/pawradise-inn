// BookingComp.js
import { AnimatePresence } from "motion/react";
import {  useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { deleteBookedService } from "../../../hooks/bookedServiceAPI";
import { deleteBookedRoom } from "../../../hooks/bookedRoomAPI";
import { createBooking, fetchMyBookingAPI, fetchMyBookings } from "../../../hooks/bookingAPI"; // Import cancelBooking
import { overlay, popUP, startUpVariants } from "../../../styles/animation";
import { removeWindowScroll } from "../../../utils/handlePopup";
import Overlay from "../../Overlay";
import CancelModal from "../CancelModal";
import SuccessMessage from "../SuccessMessage";
import {BookingRoomCard, BookingServiceCard }from "./BookingCard";

const BookingComp = () => {
  const { user, setUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [allBookedService, setAllBookedService] = useState([]);
  const [allBookedRoom, setAllBookedRoom] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingType, setBookingType] = useState(null); // 'service' or 'room'
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cancelledBooking, setCanceledBooking] = useState(null);

  useEffect(() => {
    if (!user) return;
    const getMyBookings = async () => {
      try {
        const data = await fetchMyBookings();
        console.log(data)
        // Flatten all booked_service into one array
        const allServices = data.data.flatMap((book) => book.booked_service);
        setAllBookedService(allServices);
        const allRooms = data.data.flatMap((book) => book.booked_room);
        setAllBookedRoom(allRooms);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    getMyBookings();
  }, [user]);

  const handleCancelClick = (book, type) => {
    setSelectedBooking(book);
    setBookingType(type);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    try {
      if (bookingType === 'service') {
        await deleteBookedService(selectedBooking.id);
        const filterBookingService = allBookedService.filter(
          (ab) => ab.id !== selectedBooking.id
        );
        setAllBookedService(filterBookingService);
      } else if (bookingType === 'room') {
        await deleteBookedRoom(selectedBooking.id);
        const filterBookingRoom = allBookedRoom.filter(
          (ar) => ar.id !== selectedBooking.id
        );
        setAllBookedRoom(filterBookingRoom);
      }
      
      setCanceledBooking(selectedBooking);
      setShowModal(false);
      setSelectedBooking(null);
      setBookingType(null);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      // Handle the error, maybe show an error message to the user
      setShowModal(false);
      setSelectedBooking(null);
      setBookingType(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setBookingType(null);
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
          <BookingServiceCard
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={idx / 3 + 1}
            key={book.id}
            book={book}
            onCancelClick={(book) => handleCancelClick(book, 'service')}
          />
        );
      })}
      {allBookedRoom.map((room, idx) => {
        return (
          <BookingRoomCard 
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={idx / 3 + 1}
            key={room.roomId}
            room={room}
            onCancelClick={(room) => handleCancelClick(room, 'room')}
          />
        )
      })}

      {/* Cancel Popup with overlay and animation */}
      <AnimatePresence initial={true}>
        {showModal ? (
          <div>
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
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default BookingComp;
