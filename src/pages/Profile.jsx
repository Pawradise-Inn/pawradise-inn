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
          <h1>
            My booking
          </h1>
          {my_booking.map(book => (
            <BookingCard key={book.service_name} book={book} />
          ))}

        </div>
    )
}

const BookingCard = ({book}) => {
    return(
        <div>
            <h2 className="">{book.service_name}</h2>
            <p className="text-gray-600">Pet Type: {book.pet_type}</p>
            <p className="text-gray-600">Pet Name: {book.pet_name}</p>
            <p className="text-gray-600">Status: {book.statuse}</p>
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
    {service_name: "Bath", pet_type: "Dog", pet_name: "Buddy", statuse: "completed"},
    {service_name: "Grooming", pet_type: "Cat", pet_name: "Whiskers", statuse: "in progress"}
  ])
  const [selected, setSelected] = useState("my_profile");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-48 bg-gray-100 p-4 flex flex-col space-y-2">
        <button
          onClick={() => setSelected("my_profile")}
          className={`px-4 py-2 rounded text-left ${
            selected === "my_profile" ? "bg-gray-300 font-bold" : ""
          }`}
        >
          My Profile
        </button>
        <button
          onClick={() => setSelected("my_booking")}
          className={`px-4 py-2 rounded text-left ${
            selected === "my_booking" ? "bg-gray-300 font-bold" : ""
          }`}
        >
          My Booking
        </button>
        <button
          onClick={() => setSelected("my_pet")}
          className={`px-4 py-2 rounded text-left ${
            selected === "my_pet" ? "bg-gray-300 font-bold" : ""
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