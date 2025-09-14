import { useEffect, useState } from "react"
import SuccessMessage from "./SuccessMessage";
import CancelModal from "./CancelModal";
import { useOutletContext } from "react-router-dom";

const Booking_comp = () => {
    const {user, setUser} = useOutletContext();
    const [my_booking, setMyBooking] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [cancelledBooking, setCanceledBooking] = useState(null);
    useEffect(() => {
      if(user){
        setMyBooking(user.bookings || [])
      }
    }, [user])
    const handleCancelClick = (book) => {
      setSelectedBooking(book);
      setShowModal(true);
    }

    const handleConfirmCancel = () => {
      setCanceledBooking(selectedBooking)
      setMyBooking(my_booking.filter(book => book.id !== selectedBooking.id));
      setShowModal(false);
      setSelectedBooking(null);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }

    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedBooking(null);
    }

    const handleCloseSuccessMessage = () => {
      setShowSuccessMessage(false);
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