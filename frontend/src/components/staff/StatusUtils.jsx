export const getStatusColor = (status) => {
  switch (status) {
    case "IDLE":
      return "bg-[var(--service-available-color)] text-white";
    case "QUEUE":
      return "bg-[var(--warning-color)] text-[var(--dark-brown-color)]";
    case "IN_PROGRESS":
      return "bg-[var(--service-inprogress-color)] text-[var(--dark-brown-color)]";
    case "CHECKED_IN":
      return "bg-[var(--checkIn-color)]";
    case "CHECKED_OUT":
      return "bg-[var(--checkOut-color)]";
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
      return "Checked out";
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

export const petStatusColor =(status) => {
  switch (status) {
    case "IDLE":
      return "bg-[var(--idle-color)] !text-[var(--dark-brown-color)]";
    case "QUEUE":
      return "bg-[var(--queue-color)] !text-[var(--dark-brown-color)]";
    case "IN_PROGRESS":
      return "bg-[var(--inProgress-color)] !text-[var(--dark-brown-color)]";
    case "COMPLETED":
      return "bg-[var(--complete-color)] !text-[var(--dark-brown-color)]";
    case "CHECKED_IN":
      return "bg-[var(--checkIn-color)] !text-[var(--dark-brown-color)]";
    case "CHECKED_OUT":
      return "bg-[var(--checkOut-color)] !text-[var(--dark-brown-color)]";
    default:
      return "bg-[var(--idle-color)] !text-[var(--dark-brown-color)]";
  }
};

export const getPaymentStatusColor = (status) => {
  switch (status) {
    case "SUCCESS" :
      return "bg-[var(--service-complete-color)] !text-[var(--dark-brown-color)]";
    case "FAILED" :
      return "bg-[var(--fail-color)] !text-[var(--dark-brown-color)]";
    case "CANCELLED" :
      return "bg-[var(--room-reserved-color)] !text-[var(--dark-brown-color)]";
  }
}