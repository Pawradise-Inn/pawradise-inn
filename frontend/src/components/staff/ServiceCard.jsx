const ServiceCard = ({ service, getStatusText, getStatusColor }) => {
  return (
    <div className="bg-[var(--light-brown-color)] rounded-lg p-4 shadow-lg flex items-center justify-between">
      {/* Left section: image + details */}
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={service.img}
            alt={service.staff_name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{service.service_name}</h3>
          <p className="text-sm">for {service.pet_type}</p>
          <p className="text-sm">
            {service.status === "available" || service.status === "unavailable"
              ? service.status
              : ""}
          </p>
        </div>
      </div>

      {/* Right section: status + staff */}
      <div className="flex flex-col items-end space-y-2">
        <span
          className={`w-33 flex justify-center px-4 py-1 !text-white text-sm rounded-full ${getStatusColor(
            service.status
          )}`}
        >
          {getStatusText(service.status)}
        </span>
        <p className="text-sm">by: {service.staff_name}</p>
      </div>
    </div>
  );
};

export default ServiceCard;