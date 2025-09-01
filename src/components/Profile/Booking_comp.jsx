const Booking_comp = ({my_booking}) => {
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