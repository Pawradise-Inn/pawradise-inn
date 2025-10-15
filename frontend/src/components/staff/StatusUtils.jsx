export const getStatusColor = (status) => {
    switch (status) {
      case "IDLE":         
        return "bg-blue-100 text-blue-800";
      case "QUEUE":        
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":  
        return "bg-orange-100 text-orange-800";
      case "COMPLETE":     
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

export const getStatusText = (status) => {
    switch (status) {
      case "IDLE":
        return "Idle";
      case "QUEUE":
        return "Queue";
      case "IN_PROGRESS":
        return "In progress";
      case "COMPLETE":
        return "Completed";
      default:
        return status;
    }
  };
export const getRoomStatusColor = (status) => {
    switch (status) {
      case "full":
        return "bg-red-100 text-red-800 border border-red-200";
      case "reserved":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "available":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };