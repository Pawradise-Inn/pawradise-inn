import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import BookingService from "./pages/BookingService";
import Profile_comp from "./components/Profile/Profile_comp";
import Booking_comp from "./components/Profile/Booking_comp";
import Pet_comp from "./components/Profile/Pet_comp";


const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/room" element={<div>Room Page</div>} />
                <Route path="/service" element={<BookingService/ >} />
                <Route path="/review" element={<div>Review Page</div>} />
                <Route path="/profile" element={<Profile />}>
                    <Route index element={<Profile_comp />} />
                    <Route path="booking" element={<Booking_comp />} />
                    <Route path="pet" element={<Pet_comp />} />
                </Route>
            </Routes>
        </div>
    )

}

export default App;