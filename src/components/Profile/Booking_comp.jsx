import { useState } from "react"
import SuccessMessage from "./SuccessMessage";

const Booking_comp = () => {
    const [my_booking, setMyBooking] = useState([
      {id: 1, service_name: "Bath", pet_type: "Dog", pet_name: "Buddy", statuse: "completed", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"},
      {id: 2, service_name: "Grooming", pet_type: "Cat", pet_name: "Whiskers", statuse: "in progress", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"},
      {id: 3, service_name: "Vet Checkup", pet_type: "Dog", pet_name: "Max", statuse: "scheduled", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}, 
    ])

    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [cancelledBooking, setCanceledBooking] = useState(null);

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
          {my_booking.map(book => (
            <BookingCard key={book.service_name} book={book} onCancelClick={handleCancelClick} />
          ))}

          {/* Cancel Popup */}
          {showModal && (
            <CancelModal booking={selectedBooking} onConfirm={handleConfirmCancel} onCancel={handleCloseModal} />
          )}

          <SuccessMessage 
            show = {showSuccessMessage}
            booking = {cancelledBooking}
            onClose = {handleCloseSuccessMessage}
          />
        </div>
    )
}

const BookingCard = ({ book, onCancelClick }) => {
    return(
        <div className="flex items-center bg-[var(--cream-color)] rounded-lg p-4 shadow-lg mb-6">
              <img 
                src={book.img} 
                alt={book.pet_name} 
                className="w-50 h-50 rounded object-cover shadow mr-10"/>
            {/* {Text info} */}
            <div className="flex-1 flex flex-col text-left">
              <div className="text-xl font-bold">{book.service_name}</div>
              <div className="text-base mt-2 space-y-1">
                  <p><span className="text-lg">Pet Type: {book.pet_type}</span></p>
                  <p><span className="text-lg">Pet Name: {book.pet_name}</span></p>
                  <p><span className="text-lg">Status: {book.statuse}</span></p>
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

const CancelModal = ({ booking, onConfirm, onCancel }) => {
  return (
    <>
      {/* Backdroup - dark overlay */}
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onCancel} />
    
      {/* Modal Box */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
                    {/* Modal Header */}
                    <div className="bg-[var(--brown-color)] p-6 rounded-t-2xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold flex items-center !text-[var(--cream-color)]">
                                <span className="mr-3 text-3xl">⚠️</span>
                                Cancel Booking
                            </h2>
                            <button
                              onClick={onCancel}
                              className="!text-white hover:!text-gray-300 transition-colors duration-200"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                        </div>
                    </div>
                    
                    {/* Modal Body */}
                    <div className="p-6">
                        <div className="mb-6">
                            <p className="text-gray-700 text-lg mb-4">
                                Are you sure you want to cancel this booking?
                            </p>
                            
                            {/* Booking Details */}
                            <div className="bg-[var(--cream-color)] rounded-lg p-4 space-y-2">
                                <div className="flex items-center">
                                    <img 
                                        src={booking.img} 
                                        alt={booking.pet_name}
                                        className="w-16 h-16 rounded-lg object-cover mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">{booking.service_name}</p>
                                        <p className="text-sm text-gray-600">Pet: {booking.pet_name} ({booking.pet_type})</p>
                                        <p className="text-sm text-gray-600">Status: {booking.statuse}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="!text-amber-600 text-sm mt-4 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                This action cannot be undone.
                            </p>
                        </div>
                        
                        {/* Modal Actions */}
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={onCancel}
                                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium
                                         hover:bg-gray-300 transition-all duration-200 transform hover:scale-105"
                            >
                                Keep Booking
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium
                                         hover:bg-red-600 transition-all duration-200 transform hover:scale-105
                                         shadow-lg hover:shadow-xl"
                            >
                                Yes, Cancel It
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Booking_comp;