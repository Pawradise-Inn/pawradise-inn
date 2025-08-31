import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/room" element={<div>Room Page</div>} />
                <Route path="/service" element={<div>Service Page</div>} />
                <Route path="/review" element={<div>Review Page</div>} />
                <Route path="/profile" element={<div>Profile Page</div>} />
            </Routes>
        </div>
    )

}

export default App;