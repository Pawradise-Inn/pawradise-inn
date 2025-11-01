import { useState } from "react";
import PaymentCard from "../../components/staff/PaymentCard";

const PaymentComp = () => {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const payments = [
    {
      picture: "https://via.placeholder.com/150",
      username: "John Doe",
      bookingDetails: [
        "Room A - 01/11/2025 10:00 AM",
        "Service: Spa Treatment - 01/11/2025 11:00 AM",
      ],
      totalPrice: 120,
      status: "Success",
    },
    {
      picture: "https://via.placeholder.com/150",
      username: "Jane Smith",
      bookingDetails: [
        "Room B - 02/11/2025 2:00 PM",
        "Service: Massage Therapy - 02/11/2025 3:00 PM",
      ],
      totalPrice: 150,
      status: "Failed",
    },
    {
      picture: "https://via.placeholder.com/150",
      username: "David Brown",
      bookingDetails: [
        "Room C - 03/11/2025 9:00 AM",
        "Service: Facial - 03/11/2025 10:00 AM",
      ],
      totalPrice: 200,
      status: "Cancelled",
    },
    {
      picture: "https://via.placeholder.com/150",
      username: "Emily White",
      bookingDetails: [
        "Room D - 04/11/2025 8:00 AM",
        "Service: Yoga Class - 04/11/2025 9:00 AM",
        "Service: Personal Training - 04/11/2025 10:00 AM",
        "Room D - 04/11/2025 11:00 AM",
        "Service: Nutrition Consultation - 04/11/2025 12:00 PM",
      ],
      totalPrice: 300,
      status: "Success",
    },
  ];

  const handleCheckboxChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="mt-8 flex flex-col items-start px-0">
      <b className="text-4xl mb-2 text-[var(--dark-brown-color)]">
        Manage Payment
      </b>
      <hr className="lg:w-290 md:w-175 sm:w-100 border-1 border-[var(--brown-color)] mt-2 mb-1" />

      <div className="flex flex-wrap items-center gap-4 w-full px-4">
        {/* Search Bar */}
        <div className="flex flex-1 min-w-[200px] max-w-[600px] my-4 border-2 rounded-4xl px-5 py-2 text-xl">
          <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center"></i>
          <input
            className="w-full outline-0 placeholder:opacity-75"
            placeholder="search by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Checkboxes */}
        <div className="flex flex-wrap items-center gap-4 my-4">
          {["Success", "Failed", "Cancelled"].map((status) => (
            <label key={status} className="relative flex items-center space-x-2 cursor-pointer font-semibold">
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status)}
                onChange={() => handleCheckboxChange(status)}
                className="hidden peer"
              />
              <div
                className="relative w-8 h-8 border-2 border-[var(--brown-color)] rounded transition-all bg-[var(--cream-color)]
                          before:absolute before:top-1/2 before:left-1/2 before:w-6 before:h-0.5 before:bg-[var(--dark-brown-color)]
                          before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform
                          before:transition-all before:scale-0 peer-checked:before:scale-100"
              ></div>
              <span>{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Cards */}
      <div className="w-full ml-0">
        {payments
          .filter(
            (payment) =>
              (selectedStatuses.length === 0 || selectedStatuses.includes(payment.status)) &&
              payment.username.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((payment, index) => (
            <PaymentCard
              key={index}
              picture={payment.picture}
              username={payment.username}
              bookingDetails={payment.bookingDetails}
              totalPrice={payment.totalPrice}
              status={payment.status}
            />
          ))}
      </div>
    </div>
  );
};

export default PaymentComp;
