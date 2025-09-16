// Booking_comp.js
import { useEffect, useState } from "react";
import SuccessMessage from "./SuccessMessage";
import CancelModal from "./CancelModal";
import { useOutletContext } from "react-router-dom";
import { fetchMyBookings, cancelBooking, updateBooking } from "../../hooks/bookingAPI"; // Import cancelBooking
import { deleteBookedService } from "../../hooks/bookedServiceAPI";

const Booking_comp = () => {
  const { user, setUser } = useOutletContext();
  const [my_booking, setMyBooking] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [allBookedService, setAllBookedService] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cancelledBooking, setCanceledBooking] = useState(null);

  useEffect(() => {
    const getMyBookings = async () => {
      try {
        const data = await fetchMyBookings(1);
        setMyBooking(data.data);

        // Flatten all booked_service into one array
        const allServices = data.data.flatMap(book => book.booked_service);
        setAllBookedService(allServices);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    getMyBookings();
  }, []);

  console.log("all booked service: ", allBookedService)
  const handleCancelClick = (book) => {
    setSelectedBooking(book);
    console.log(book.id)
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    try {
      deleteBookedService(selectedBooking.id);
      const filterBookingService = allBookedService.filter(ab => ab.id != selectedBooking.id);
      setAllBookedService(filterBookingService)
      setCanceledBooking(selectedBooking);
      setShowModal(false);
      setSelectedBooking(null);
      setShowSuccessMessage(true);
      console.log(my_booking)
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

  return (
    <div>
      <SuccessMessage
        show={showSuccessMessage}
        booking={cancelledBooking}
        onClose={handleCloseSuccessMessage}
      />

    {allBookedService.map((book) => {
      return(<BookingCard key={book.id} book={book} onCancelClick={handleCancelClick} />)
    })};

      {/* Cancel Popup */}
      {showModal && (
        <CancelModal
          booking={selectedBooking}
          onConfirm={handleConfirmCancel}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};

const BookingCard = ({ book, onCancelClick}) => {
  console.log("book: ", book)
  return (
    <div className="flex items-center bg-[var(--cream-color)] rounded-lg p-4 shadow-lg mb-6">
      <img
        src={book.img }
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
        className="px-4 py-2 bg-[var(--dark-brown-color)] text-lg rounded !text-white
                        shadow transition-all duration-300 ease-in-out
                        hover:bg-[#d2bba0] hover:!text-[var(--dark-brown-color)] hover:scale-105"
      >
        cancel
      </button>
    </div>
  );
};

export default Booking_comp;