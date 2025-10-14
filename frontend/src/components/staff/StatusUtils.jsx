export const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-600";
    case "in_progress":
      return "bg-blue-600";
    case "available":
      return "bg-gray-600";
    case "unavailable":
      return "bg-red-600";
    default:
      return "bg-gray-600";
  }
};
export const getStatusText = (status) => {
  switch (status) {
    case "completed":
      return "🟢 Completed";
    case "available":
      return "🔵 Available";
    case "unavailable":
      return "🔴 Unavailable";
    case "in_progress":
      return "🟡 In progress";
    default:
      return status;
  }
};
export const getRoomStatusColor = (status) => {
  switch (status) {
    case "full":
      return "bg-red-600";
    case "reserved":
      return "bg-yellow-600";
    case "available":
      return "bg-green-600";
    default:
      return "bg-gray-600";
  }
};

