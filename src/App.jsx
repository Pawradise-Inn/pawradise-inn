import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import BookingService from "./pages/BookingService";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/room" element={<div>Room Page</div>} />
                <Route path="/service" element={<BookingService/ >} />
                <Route path="/review" element={<div>Review Page</div>} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    )

}

export default App;