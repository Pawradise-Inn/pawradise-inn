import testImage from "../../../../assets/test.png";

const ServiceCard = ({ service, getStatusText, getStatusColor, pet }) => {
  console.log(service)
  return (
    <div className="bg-[var(--light-brown-color)] rounded-lg p-6 shadow-lg flex items-center justify-between">
      <div className="flex items-center space-x-6 flex-1">
        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src={service.picture || testImage}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
          <p className="text-lg text-gray-700">{pet.type}</p>
        </div>
      </div>
      <div className="ml-6">
        <span
          className={`px-6 py-3 text-lg font-semibold rounded-full min-w-[140px] text-center inline-block whitespace-nowrap ${getStatusColor(
            pet.status
          )}`}
        >
          {getStatusText(pet.status)}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
