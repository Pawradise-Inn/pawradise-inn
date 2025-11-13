import testImage from "../../assets/test.png";
import { getStatusText, petStatusColor } from "./StatusUtils";

const RoomCard = ({ room, checkIn, checkOut, status }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-[var(--light-brown-color)] rounded-lg p-4 shadow-lg flex items-center justify-between">
      {/* Left section: image + details */}
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={room?.picture || testImage}
            alt={room?.name || "Room"}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{room?.name || `Room ${room?.number || 'N/A'}`}</h3>
          <p className="text-sm">Check-in: {formatDate(checkIn)}</p>
          <p className="text-sm">Check-out: {formatDate(checkOut)}</p>
        </div>
      </div>

      {/* Right section: status */}
      <div className="flex flex-col items-end space-y-2">
        <span
          className={`px-4 py-2 text-sm font-semibold rounded-full min-w-[120px] text-center inline-block whitespace-nowrap shadow-md border ${petStatusColor(status)}`}
        >
          {getStatusText(status)}
        </span>
      </div>
    </div>
  );
};

export default RoomCard;
