import { useState } from "react"
import Booking_comp from "../components/Profile/Booking_comp"
import Profile_comp from "../components/Profile/Profile_comp"

const Profile = () => {
  
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
        {selected === "my_profile" && <Profile_comp/>}
        {selected === "my_booking" && <Booking_comp/>}
        {selected === "my_pet" && <div>My Pet Content</div>}
      </div>
    </div>
  );
};
export default Profile;