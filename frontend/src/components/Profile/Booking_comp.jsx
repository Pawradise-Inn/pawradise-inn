// Booking_comp.js
import { useEffect, useState } from "react";
import SuccessMessage from "./SuccessMessage";
import CancelModal from "./CancelModal";
import { useOutletContext } from "react-router-dom";
import { fetchMyBookings, cancelBooking } from "../../hooks/bookingAPI"; // Import cancelBooking

const Booking_comp = () => {
  const { user, setUser } = useOutletContext();
  const [my_booking, setMyBooking] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cancelledBooking, setCanceledBooking] = useState(null);

  useEffect(() => {
    const getMyBookings = async () => {
      
        try {
          fetchMyBookings(1).then((data) => setMyBooking(data.data));
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
        }

    };
    getMyBookings();
  }, []);

  useEffect(() => {console.log(my_booking)}, [my_booking]);
  const handleCancelClick = (book) => {
    setSelectedBooking(book);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    try {
      await cancelBooking(selectedBooking.id); // Call the API to cancel the booking
      setCanceledBooking(selectedBooking);
      setMyBooking(my_booking.filter((book) => book.id !== selectedBooking.id));
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

  return (
    <div>
      <SuccessMessage
        show={showSuccessMessage}
        booking={cancelledBooking}
        onClose={handleCloseSuccessMessage}
      />

      {my_booking.map((book) => {
        return book.booked_service.map((data) => {
        return (<BookingCard
          key={data.id} // It's better to use a unique ID for the key, like book.id
          book={data}
          onCancelClick={handleCancelClick}
        />)
    })
  })}

  


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

const BookingCard = ({ book, onCancelClick }) => {
  return (
    <div className="flex items-center bg-[var(--cream-color)] rounded-lg p-4 shadow-lg mb-6">
      <img
        src={book.img || ""}
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