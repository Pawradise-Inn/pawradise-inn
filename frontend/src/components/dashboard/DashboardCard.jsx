const DashboardCard = ({ data, onClick}) => {

  const handleStatusBoxClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };


  const getStatusColor = (status) => {
      if (status === "CHECKED_IN") return "var()";
      if (status === "CHECKED_OUT") return "var()";
      if (status === "QUEUE") return "var()";
      if (status === "IN PROGRESS") return "var(--service-inprogress-color)";
    if (status === "COMPLETED") return "var(--service-complete-color";
    return "var(--service-available-color)";
  };
  const cardStyle = {
    display: "flex",
    alignItems: "center",
    border: "2px solid var(--brown-color)",
    borderRadius: "12px",
    padding: "25px",
    cursor: "pointer",
    backgroundColor: "var(--cream-color)",
    width: "100%",
    marginBottom: "1rem",
  };

  const textContainerStyle = { textAlign: "left", flexGrow: 1, marginLeft: "3rem"};
  const nameStyle = { margin: "0", fontSize: "1.2rem", fontWeight: "bold" };
  const detailStyle = { margin: "10px 0 10px", color: "var(--dark-brown-color)" ,fontSize: "1.5 rem",
    fontWeight: "600" };
  const statusBoxContainerStyle = { position: "relative", marginLeft: "16px" };
  const statusBox= {
    width: "100px",
    height: "30px",
    backgroundColor: "white",
    border: "1px solid var(--brown-color)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
  };
  const statusCircleStyle = {
    width: "12px",
    height: "12px",
    backgroundColor: getStatusColor(data.petStatus),
    borderRadius: "50%",

  };
  const statusTextStyle = {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "var(--dark-brown-color)",
    marginLeft: "6px",
    textTransform: "capitalize",
  };
  return (
    <div style={cardStyle} onClick={onClick}>
      <img src={data.serviceImage ||data.roomImage} className="object-center rounded-2xl w-[140px] h-[140px]"></img>
      <div style={textContainerStyle}>
        <p style={nameStyle}>{data.roomId ? "Room Id " : null}{data.serviceName || data.roomId}</p>
        <p style={detailStyle}>{data.petName}</p>
        <p style={detailStyle}>
        {data.timeBooked ? (
          <p style={detailStyle}>
            {new Date(data.timeBooked).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        ) : (
          <>
            <p style={detailStyle}>
              Check-in: {new Date(data.checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric"})}
            </p>
            <p style={detailStyle}>
              Check-out: {new Date(data.checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric"})}
            </p>
          </>
        )}
        </p>
      </div>
      <div style={statusBoxContainerStyle}>
        <div style={statusBox} onClick={handleStatusBoxClick}>
          <div style={statusCircleStyle}></div>
          <span style={statusTextStyle}>{data.petStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;