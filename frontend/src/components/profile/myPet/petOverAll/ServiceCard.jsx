const ServiceCard = ({ service, getStatusText, getStatusColor, pet }) => {
  return (
    <div className="bg-(--light-brown-color) rounded-lg p-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden ">
            <img
              src={service.picture}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{service.name}</h3>
            <p className="text-sm">{pet.type}</p>
            {/* <p className="text-sm">{service.status === 'available' || service.status === 'unavailable' ? service.status : `by - ${service.staff_name}`}</p> */}
            <p className="text-sm">unavailable</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-white text-sm rounded-full ${getStatusColor(
            "unavailable"
          )}`}
        >
          {getStatusText("unavailable")}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
