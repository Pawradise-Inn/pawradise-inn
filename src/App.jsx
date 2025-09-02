import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import StaffNavbar from "./components/StaffNavbar";
import Profile from "./pages/Profile";
import BookingService from "./pages/BookingService";
import Profile_comp from "./components/Profile/Profile_comp";
import Booking_comp from "./components/Profile/Booking_comp";
import Pet_comp from "./components/Profile/Pet_comp";
import PetOverall from "./components/Profile/PetOverall";
import NewPet from "./components/Profile/NewPet";

const App = () => {
    const location = useLocation();

    // Check if the current path starts with "/staff"
    const isStaffPath = location.pathname.startsWith("/staff");

    return (
        <div>
            {/* Conditionally render Navbar or StaffNavbar */}
            {isStaffPath ? <StaffNavbar /> : <Navbar />}
            
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/room" element={<div>Room Page</div>} />
                <Route path="/service" element={<BookingService />} />
                <Route path="/review" element={<div>Review Page</div>} />
                <Route path="/profile" element={<Profile />}>
                    <Route index element={<Profile_comp />} />
                    <Route path="booking" element={<Booking_comp />} />
                    <Route path="pet" element={<Pet_comp />} />
                    <Route path="pet/:id" element={<PetOverall />} />
                    <Route path="pet/new" element={<NewPet />} />
                </Route>

                {/* Staff Routes */}
                <Route path="/staff" element={<div>Staff Home Page</div>} />
                <Route path="/staff/dashboard" element={<div>Dashboard Page</div>} />
                <Route path="/staff/pet status" element={<div>Pet Status Page</div>} />
                <Route path="/staff/review" element={<div>Staff Review Page</div>} />
                <Route path="/staff/management" element={<div>Management Page</div>} />
            </Routes>
        </div>
    );
};

export default App;