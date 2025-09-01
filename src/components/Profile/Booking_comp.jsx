import { useState } from "react"

const Booking_comp = () => {
    const [my_booking, setMyBooking] = useState([
      {id: 1, service_name: "Bath", pet_type: "Dog", pet_name: "Buddy", statuse: "completed", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"},
      {id: 2, service_name: "Grooming", pet_type: "Cat", pet_name: "Whiskers", statuse: "in progress", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"},
      {id: 3, service_name: "Vet Checkup", pet_type: "Dog", pet_name: "Max", statuse: "scheduled", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}, 
    ])
    return(
        <div>
          {my_booking.map(book => (
            <BookingCard key={book.service_name} book={book} />
          ))}

        </div>
    )
}

const BookingCard = ({book}) => {
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
            <button onClick={() => window.confirm("Cancel booking?")}
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