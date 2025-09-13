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

 const getBoxClass = (isActive) =>
   `flex-shrink-0 px-12 py-6 rounded-xl transition-all duration-300
    text-base sm:text-lg md:text-2xl font-semibold
    ${
      isActive
        ? "bg-[var(--light-brown-color)] font-bold text-gray-800 shadow-lg"
        : "bg-transparent text-gray-800 hover:bg-[var(--light-brown-color)]"
    }`;


  return (
    <div className="flex flex-col items-center mt-16 px-4 sm:px-8">
      <h2 className="w-full text-5xl font-extrabold mb-8 text-left">Dashboard</h2>

      {/* Centered Tabs Wrapper */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="flex justify-center overflow-x-auto space-x-4 pb-2">
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

        {/* Extended Underline */}
        <div
          className="absolute bottom-0 h-[2px] bg-gray-700"
          style={{
            width: "120%",           // stretch underline 20% wider
            left: "50%",             // anchor at center
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="w-full flex justify-center mt-8 px-2 sm:px-0">
        {activeBox === 1 && <DashboardTab1 />}
        {/* {activeBox === 2 && <DashboardTab2 />} */}
      </div>
    </div>
  );
};

export default Dashboard;