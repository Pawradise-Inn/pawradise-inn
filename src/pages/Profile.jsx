import { useState } from "react"

const Profile_comp = () => {
    return(
        <div>

        </div>
    )
}
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

const Pet_comp = () => {
    return(
        <div>My Pet Component</div>
    )
}


const Profile = () => {
  const [my_booking, setMyBooking] = useState([
    {service_name: "Bath", pet_type: "Dog", pet_name: "Buddy", statuse: "completed", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"},
    {service_name: "Grooming", pet_type: "Cat", pet_name: "Whiskers", statuse: "in progress", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}, 
  ])
  const [selected, setSelected] = useState("my_profile");

  return (  
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-48 p-4 flex flex-col space-y-2 font-semibold">
        <button
          onClick={() => setSelected("my_profile")}
          className={`px-4 py-2 rounded ${
            selected === "my_profile" ? "bg-[var(--dark-brown-color)] font-bold !text-white transition-all duration-300 ease-in-out" : ""
          }`}
        >
          My Profile
        </button>
        <button
          onClick={() => setSelected("my_booking")}
          className={`px-4 py-2 rounded ${
            selected === "my_booking" ? "bg-[var(--dark-brown-color)] font-bold !text-white transition-all duration-300 ease-in-out" : ""
          }`}
        >
          My Booking
        </button>
        <button
          onClick={() => setSelected("my_pet")}
          className={`px-4 py-2 rounded ${
            selected === "my_pet" ? "bg-[var(--dark-brown-color)] font-bold !text-white transition-all duration-300 ease-in-out" : ""
          }`}
        >
          My Pet
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {selected === "my_profile" && <Profile_comp />}
        {selected === "my_booking" && <Booking_comp my_booking={my_booking}/>}
        {selected === "my_pet" && <Pet_comp />}
      </div>
    </div>
  );
};
export default Profile;