import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./pages/customer/Profile";
import BookingRoom from "./pages/customer/BookingRoom";
import BookingService from "./pages/customer/BookingService";
import Registration from "./pages/customer/Registration";
import Login from "./pages/login";

import StaffNavbar from "./components/StaffNavbar";
import Footer from "./components/Footer";
import Profile_comp from "./components/Profile/Profile_comp";
import Booking_comp from "./components/Profile/Booking_comp";
import Pet_comp from "./components/Profile/Pet_comp";
import PetOverall from "./components/Profile/PetOverall";
import NewPet from "./components/Profile/NewPet";
import Management from "./pages/Management";
import ServiceEdit from "./components/Management/Service_edit";
import PetStatus from "./pages/staff/PetStatus";
import PetUpdate from "./pages/staff/PetUpdate";
import Dashboard from "./pages/staff/Dashboard";

const App = () => {
    const location = useLocation();

    // Check if the current path starts with "/staff"
    const isStaffPath = location.pathname.startsWith("/staff");
    const isRegistrationPath = location.pathname === "/register";
    const isLogin = location.pathname === "/login";

    return (
        <div>
            {/* Conditionally render Navbar or StaffNavbar */}
            {/* {isStaffPath ? <StaffNavbar /> : <Navbar />} */}
            {isRegistrationPath||isLogin ? null : isStaffPath ? <StaffNavbar /> : <Navbar /> }
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/room" element={<><BookingRoom/><Footer/></> } />

                <Route path="/service" element={<><BookingService /><Footer/></>} />
                <Route path="/review" element={<><div>Review Page</div><Footer/></>} />
                <Route path="/profile" element={<Profile />}>
                    <Route index element={<Profile_comp />} />
                    <Route path="booking" element={<Booking_comp />} />
                    <Route path="pet" element={<Pet_comp />} />
                    <Route path="pet/:id" element={<PetOverall />} />
                    <Route path="pet/new" element={<NewPet />} />
                </Route>
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login/>} />

                {/* Staff Routes */}
                <Route path="/staff" element={<div>Staff log in</div>} />
                <Route path="/staff/dashboard" element={<Dashboard />} />

                <Route path="/staff/pet" element={<PetStatus />} />
                <Route path="/staff/pet/:id" element={<PetUpdate />} />
                <Route path="/staff/review" element={<div>Staff Review Page</div>} />
                <Route path="/staff/management" element={<Management />}>
                    <Route index element={<ServiceEdit />} />
                    <Route path="profile" element={<Profile_comp />} />
                    <Route path="payment" element={<div>Manage Payment Page</div>} />
                    <Route path="room" element={<div>Manage Room Page</div>} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;