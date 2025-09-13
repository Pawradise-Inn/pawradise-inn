const rainbowColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-400",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500"
];

// Repeat colors to make the stack much taller than the container
const bigRainbowStack = Array(5)
    .fill(rainbowColors)
    .flat();

const DashboardTab1 = () => {
    return (
        <div className="flex flex-col items-center mt-8">
            {bigRainbowStack.map((color, idx) => (
                <div
                    key={idx}
                    className={`w-60 h-60 ${color} rounded mb-8`}
                />
            ))}
        </div>
    );
};

export default DashboardTab1;