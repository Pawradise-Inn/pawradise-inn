const BookingCard = ({ room, getRoomStatusColor, pet, checkIn, checkOut }) => {
  console.log(room)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formattedCheckIn = formatDate(checkIn);
  const formattedCheckOut = formatDate(checkOut);

  return (
    <div className="bg-[var(--cream-color)] rounded-lg p-6 shadow-lg">
      {/* <div className="flex items-center space-x-3 mb-4">
        <h2 className="text-2xl font-bold">Room Status</h2>
        <span
          className={`px-4 py-2 text-lg font-semibold rounded-full min-w-[120px] text-center inline-block ${getRoomStatusColor(
            room.status
          )}`}
        >
          {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
        </span>
      </div> */}
      <div className="flex items-start space-x-6">
        <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={room.img}
            alt="Room"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-bold">Room {room.id}</h3>
          <p className="text-base">
            <span className="font-semibold">Pet:</span> {pet.name}
          </p>
          <p className="text-base">For {pet.type}</p>
          <p className="text-base">
            {formattedCheckIn} to {formattedCheckOut}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
