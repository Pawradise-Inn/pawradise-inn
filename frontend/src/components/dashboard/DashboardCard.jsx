const DashboardCard = ({ data, onClick}) => {

  const handleStatusBoxClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };


  const getStatusColor = (status) => {
    if (status === "completed") return "limegreen";
    if (status === "cancelled") return "grey";
    return "gold";
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
  const detailStyle = { margin: "4px 0 0", color: "#666" };
  const dropdownContainerStyle = { position: "relative", marginLeft: "16px" };
  const dropdownBoxStyle = {
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
    backgroundColor: getStatusColor(data.status),
    borderRadius: "50%",

  };
  const statusTextStyle = {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#333",
    marginLeft: "6px",
    textTransform: "capitalize",
  };
  return (
    <div style={cardStyle} onClick={onClick}>
      <img src={data.serviceImage} className="object-center rounded-2xl w-[140px] h-[140px]"></img>
      <div style={textContainerStyle}>
        <p style={nameStyle}>{data.serviceName}</p>
        <p style={detailStyle}>{data.petName}</p>
        <p style={detailStyle}>
          {new Date(data.timeBooked).toLocaleString("en-US", {
            month: "short", // "Sep"
            day: "numeric", // "17"
            hour: "numeric", // "2"
            minute: "2-digit", // "44"
            hour12: true, // "AM/PM"
          })}
        </p>
      </div>
      <div style={dropdownContainerStyle}>
        <div style={dropdownBoxStyle} onClick={handleStatusBoxClick}>
          <div style={statusCircleStyle}></div>
          <span style={statusTextStyle}>{data.petStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;