import { useState } from "react";
import DashboardTab1 from "./DashboardTab1";


const boxData = [
    { id: 1, label: "Today's Booking" },
    { id: 2, label: "Check-in" },
    { id: 3, label: "Check-out" },
    { id: 4, label: "Service booked" },
];

const Dashboard = () => {
    const [activeBox, setActiveBox] = useState(1);

    // Helper for active styling, similar to Management.jsx
    const getBoxClass = (isActive) =>
        `flex-1 px-8 py-6 rounded-lg transition-all duration-300 font-semibold text-3xl
        ${isActive
            ? "bg-[var(--light-brown-color)] font-bold text-gray-800 shadow"
            : "bg-transparent text-gray-800 hover:bg-[var(--light-brown-color)]"}
        `;

    return (
        <div className="flex flex-col items-center mt-16">
            <div className="w-full flex">
                <h2 className="text-5xl font-extrabold mb-8 ml-8 mt-2 text-left">Dashboard</h2>
            </div>
            <div className="flex justify-center w-full max-w-5xl space-x-4 flex-wrap">
                {boxData.map((box) => (
                    <button
                        key={box.id}
                        onClick={() => setActiveBox(box.id)}
                        className={getBoxClass(activeBox === box.id)}  
                    >
                        {box.label}
                    </button>
                ))}
            </div>
            <div
                className="mt-4"
                style={{
                    width: "100%",
                    borderBottom: "2px solid #222",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            />
            <div className="w-full flex justify-center mt-8"> 
                {activeBox === 1 && <DashboardTab1 />}
                {/* {activeBox === 2 && <DashboardTab2 />} */}
                {/* {activeBox === 3 && <DashboardTab3 />} */}
                {/* {activeBox === 4 && <DashboardTab4 />} */}
            </div>
        </div>
    );
};

export default Dashboard;