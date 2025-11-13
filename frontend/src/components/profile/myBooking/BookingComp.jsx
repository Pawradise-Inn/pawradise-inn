// BookingComp.js
import {  useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { deleteBookedService, updateBookedService } from "../../../hooks/bookedServiceAPI";
import { deleteBookedRoom, updateBookedRoom } from "../../../hooks/bookedRoomAPI";
import { fetchMyBookings } from "../../../hooks/bookingAPI"; // Import cancelBooking
import { startUpVariants } from "../../../styles/animation";
import {BookingRoomCard, BookingServiceCard }from "./BookingCard";
import { useNotification } from "../../../context/notification/NotificationProvider";

const BookingComp = () => {
  const { user } = useAuth();
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
        const filterBookingService = allServices.filter(
              (ab) => ab.status != "CANCELLED"
            );
        setAllBookedService(filterBookingService);
        const allRooms = data.data.flatMap((book) => book.booked_room);
        const filterBookingRoom = allRooms.filter(
              (ab) => ab.status != "CANCELLED"
            );
        setAllBookedRoom(filterBookingRoom);
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
            await updateBookedService(obj.id, {status: "CANCELLED"});
            const filterBookingService = allBookedService.filter(
              (ab) => ab.id !== obj.id
            );
            setAllBookedService(filterBookingService);
          } else if (type === 'room') {
            await updateBookedRoom(obj.id, {status: "CANCELLED"});
            const filterBookingRoom = allBookedRoom.filter(
              (ar) => ar.id !== obj.id
            );
            setAllBookedRoom(filterBookingRoom);
          }
        } catch (error) {
          console.error("Failed to cancel booking:", error);
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
