import { useEffect, useState } from "react"
import SuccessMessage from "./SuccessMessage";
import CancelModal from "./CancelModal";
import { useOutletContext } from "react-router-dom";
import { fetchCustomerBookingsAPI,cancelBookingAPI} from '../../hooks/bookingAPI';

const Booking_comp = () => {
    const {user, setUser} = useOutletContext();
    const [my_booking, setMyBooking] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [cancelledBooking, setCanceledBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
      const loadBookings = async () => {
      if (user && user.id) { // Make sure user has an ID
        setLoading(true);
        setError('');
        try {
          // Call the API to get customer bookings
          const bookings = await fetchCustomerBookingsAPI(user.id);
          setMyBooking(bookings);
        } catch (err) {
          console.error('Failed to load bookings:', err);
          setError('Failed to load bookings');
          // Fallback to user.bookings if API fails
          setMyBooking(user.bookings || []);
        } finally {
          setLoading(false);
        }
      }
    };

    loadBookings();
  }, [user]);
    const handleCancelClick = (book) => {
      setSelectedBooking(book);
      setShowModal(true);
    }

      const handleConfirmCancel = async () => {
    try {
      setLoading(true);
      // Call the cancel booking API
      await cancelBookingAPI(selectedBooking.id);
      
      // Update the local state
      setCanceledBooking(selectedBooking);
      setMyBooking(my_booking.filter(book => book.id !== selectedBooking.id));
      setShowModal(false);
      setSelectedBooking(null);
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      alert('Failed to cancel booking: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedBooking(null);
    }

    const handleCloseSuccessMessage = () => {
      setShowSuccessMessage(false);
    }

      if (loading && my_booking.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading bookings...</div>
      </div>
    );
  }

  // Show error state
  if (error && my_booking.length === 0) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error: </strong>{error}
      </div>
    );
  }

    return(
        <div>
          <SuccessMessage 
            show = {showSuccessMessage}
            booking = {cancelledBooking}
            onClose = {handleCloseSuccessMessage}
          />

          {my_booking.map(book => (
            <BookingCard key={book.service_name} book={book} onCancelClick={handleCancelClick} />
          ))}

          {/* Cancel Popup */}
          {showModal && (
            <CancelModal booking={selectedBooking} onConfirm={handleConfirmCancel} onCancel={handleCloseModal} />
          )}
        </div>
    )
}

const BookingCard = ({ book, onCancelClick }) => {
    return(
        <div className="flex items-center bg-[var(--cream-color)] rounded-lg p-4 shadow-lg mb-6">
              <img 
                src={book.img || ""} 
                alt={book.pet_name || ""} 
                className="w-50 h-50 rounded object-cover shadow mr-10"/>
            {/* {Text info} */}
            <div className="flex-1 flex flex-col text-left">
              <div className="text-xl font-bold">{book.service_name || ""}</div>
              <div className="text-base mt-2 space-y-1">
                  <p><span className="text-lg">Pet Type: {book.pet_type || ""}</span></p>
                  <p><span className="text-lg">Pet Name: {book.pet_name || ""}</span></p>
                  <p><span className="text-lg">Status: {book.statuse || ""}</span></p>
              </div>
          </div>
            {/* {Action Button} */}
            <button onClick={() => onCancelClick(book)}
              className="px-4 py-2 bg-[var(--dark-brown-color)] text-lg rounded !text-white
                        shadow transition-all duration-300 ease-in-out
                        hover:bg-[#d2bba0] hover:!text-[var(--dark-brown-color)] hover:scale-105"
            >
              cancel
            </button>            
        </div>
    )
}

export default Booking_comp;