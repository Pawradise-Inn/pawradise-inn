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
import { useNotification } from "../../../context/notification/NotificationProvider";

const BookingComp = () => {
  const { user, setUser } = useAuth();
  const [allBookedService, setAllBookedService] = useState([]);
  const [allBookedRoom, setAllBookedRoom] = useState([]);
  const {createNotification} = useNotification();

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


  const handleCancel = (obj, type) => {
    console.log(obj, type);
    createNotification(
      "warning",
      "Confirm Deletion",
      `Are you sure you want to delete this booking? This cannot be undone.`,
      async () => {
        try {
          if (type === 'service') {
            await deleteBookedService(obj.id);
            const filterBookingService = allBookedService.filter(
              (ab) => ab.id !== obj.id
            );
            setAllBookedService(filterBookingService);
          } else if (type === 'room') {
            await deleteBookedRoom(obj.id);
            const filterBookingRoom = allBookedRoom.filter(
              (ar) => ar.id !== obj.id
            );
            setAllBookedRoom(filterBookingRoom);
          }
          createNotification("success", "Delete successfully", "The booking has been deleted");
        } catch (error) {
          console.error("Failed to cancel booking:", error);
          createNotification("fail", "Delete failed", "Failed to delete booking.");
        }
      }
    );
  };


  return (
    <div>

      {allBookedService.map((book, idx) => {
        return (
          <BookingServiceCard
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={idx / 3 + 1}
            key={book.id || idx}
            book={book}
            onCancelClick={(book) => handleCancel(book, 'service')}
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
            key={room.id || idx}
            room={room}
            onCancelClick={(room) => handleCancel(room, 'room')}
          />
        )
      })}

    </div>
  );
};

export default BookingComp;
