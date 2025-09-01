import { useState } from "react"
import Booking_comp from "../components/Profile/Booking_comp"

const Profile = () => {
  const [my_booking, setMyBooking] = useState([
    {id: 1, service_name: "Bath", pet_type: "Dog", pet_name: "Buddy", statuse: "completed", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"},
    {id: 2, service_name: "Grooming", pet_type: "Cat", pet_name: "Whiskers", statuse: "in progress", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"},
    {id: 3, service_name: "Vet Checkup", pet_type: "Dog", pet_name: "Max", statuse: "scheduled", img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}, 
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
        {selected === "my_profile" && <div>My Profile Content</div>}
        {selected === "my_booking" && <Booking_comp my_booking={my_booking}/>}
        {selected === "my_pet" && <div>My Pet Content</div>}
      </div>
    </div>
  );
};
export default Profile;