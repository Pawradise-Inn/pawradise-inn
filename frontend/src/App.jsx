import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookingRoom from "./pages/customer/BookingRoom";
import BookingService from "./pages/customer/BookingService";
import Profile from "./pages/customer/Profile";
import Registration from "./pages/customer/Registration";
import Login from "./pages/Login";

import Footer from "./components/Footer";
import RoomEdit from "./components/Management/room_edit";
import ServiceEdit from "./components/Management/Service_edit";
import BookingComp from "./components/profile/myBooking/BookingComp";
import NewPet from "./components/profile/myPet/newPet/NewPet";
import PetComp from "./components/profile/myPet/PetComp";
import PetOverall from "./components/profile/myPet/petOverAll/PetOverall";
import ProfileComp from "./components/profile/myProfile/ProfileComp";
import StaffNavbar from "./components/StaffNavbar";
import Management from "./pages/Management";
import Dashboard from "./pages/staff/dashboard/Dashboard";
import DashboardTab1 from "./pages/staff/dashboard/DashboardTab1";
import DashboardTab2 from "./pages/staff/dashboard/DashboardTab2";
import DashboardTab3 from "./pages/staff/dashboard/DashboardTab3";
import DashboardTab4 from "./pages/staff/dashboard/DashboardTab4";
import PetStatus from "./pages/staff/PetStatus";
import PetUpdate from "./pages/staff/PetUpdate";
import StaffReview from "./pages/staff/StaffReview";
import RequireAuth from "./utils/RequireAuth";
import Review from "./pages/customer/Review";
import ReviewComp from "./components/review/ReviewComp";
import HistoryComp from "./components/review/history/HistoryComp";

const App = () => {
  const location = useLocation();

  const isStaffPath = location.pathname.startsWith("/staff");
  const isRegistrationPath = location.pathname === "/register";
  const isCustomerLogin = location.pathname === "/login";
  const isStaffLogin = location.pathname === "/staff/login";

  const hideNavbar = isRegistrationPath || isCustomerLogin || isStaffLogin;

  return (
    <div>
      {hideNavbar ? null : isStaffPath ? <StaffNavbar /> : <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/staff/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route
          path="/room"
          element={
            <>
              <BookingRoom />
              <Footer />
            </>
          }
        />
        <Route
          path="/service"
          element={
            <>
              <BookingService />
              <Footer />
            </>
          }
        />

        <Route path="/profile" element={<Profile />}>
          <Route index element={<ProfileComp />} />
          <Route path="booking" element={<BookingComp />} />
          <Route path="pet" element={<PetComp />} />
          <Route path="pet/:id" element={<PetOverall />} />
          <Route path="pet/new" element={<NewPet />} />
        </Route>

        <Route path="/review" element={<Review />}>
          <Route index element={<ReviewComp />} />
          <Route path="history" element={<HistoryComp />} />
        </Route>

        <Route path="/" element={<Navigate to="/room" replace />} />
        <Route path="*" element={<Navigate to="/room" replace />} />

        <Route
          path="/staff/dashboard"
          element={
            <RequireAuth roles={["staff", "admin"]}>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardTab1 />} />
          <Route path="check-in" element={<DashboardTab2 />} />
          <Route path="check-out" element={<DashboardTab3 />} />
          <Route path="service-booked" element={<DashboardTab4 />} />
        </Route>

        <Route
          path="/staff/pet-status"
          element={
            <RequireAuth roles={["staff", "admin"]}>
              <PetStatus />
            </RequireAuth>
          }
        />
        <Route
          path="/staff/pet/:id"
          element={
            <RequireAuth roles={["staff", "admin"]}>
              <PetUpdate />
            </RequireAuth>
          }
        />
        <Route
          path="/staff/review"
          element={
            <RequireAuth roles={["staff", "admin"]}>
              <StaffReview />
            </RequireAuth>
          }
        />
        <Route
          path="/staff/management"
          element={
            <RequireAuth roles={["staff", "admin"]}>
              <Management />
            </RequireAuth>
          }
        >
          <Route index element={<ServiceEdit />} />
          <Route path="profile" element={<ProfileComp />} />
          <Route path="payment" element={<div>Manage Payment Page</div>} />
          <Route path="room" element={<RoomEdit />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;