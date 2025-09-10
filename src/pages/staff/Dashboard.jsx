import { useState } from "react";

const boxData = [
    { id: 1, label: "Overview" },
    { id: 2, label: "Bookings" },
    { id: 3, label: "Pets" },
    { id: 4, label: "Staff" },
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
            <div className="flex justify-center w-full max-w-5xl space-x-8">
                {boxData.map((box) => (
                    <button
                        key={box.id}
                        // In the future, replace this with navigation logic
                        onClick={() => setActiveBox(box.id)}
                        className={getBoxClass(activeBox === box.id)}
                        style={{ minWidth: "180px", maxWidth: "300px" }}
                    >
                        {box.label}
                    </button>
                ))}
            </div>
            <div
                className="mt-4"
                style={{
                    width: "calc(4 * 260px)", // Increased from 220px to 260px for a longer line
                    borderBottom: "2px solid #222",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            />
        </div>
    );
};

export default Dashboard;