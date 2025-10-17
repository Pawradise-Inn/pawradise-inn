export const getStatusColor = (status) => {
  switch (status) {
    case "IDLE":
      return "bg-[var(--service-available-color)] text-white";
    case "QUEUE":
      return "bg-[var(--warning-color)] text-[var(--dark-brown-color)]";
    case "IN_PROGRESS":
      return "bg-[var(--service-inprogress-color)] text-[var(--dark-brown-color)]";
    case "COMPLETE":
      return "bg-[var(--service-complete-color)] text-white";
    default:
      return "bg-[var(--light-brown-color)] text-[var(--dark-brown-color)]";
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
    case "COMPLETED":
      return "Completed";
    case "CHECKED_IN":
      return "Checked in";
    case "CHECKED_OUT":
      return "Chceked out";
    default:
      return status;
  }
};
export const getRoomStatusColor = (status) => {
  switch (status) {
    case "full":
      return "bg-[var(--room-full-color-color)] text-white border border-[var(--fail-color-alpha)]";
    case "reserved":
      return "bg-[var(--room-reserved-color)] text-[var(--dark-brown-color)] border border-[var(--warning-color-alpha)]";
    case "available":
      return "bg-[var(--room-available-color)] text-white border border-[var(--success-color-alpha)]";
    default:
      return "bg-[var(--light-brown-color)] text-[var(--dark-brown-color)] border border-[var(--brown-color)]";
  }
};