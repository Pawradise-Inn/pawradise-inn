import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useNotification } from "../../context/notification/NotificationProvider";
import { fetchPetAPI, updatePetAPI } from "../../hooks/petAPI";

const PetUpdate = () => {
  const { createNotification } = useNotification();
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [status, setStatus] = useState("");
  const fetchPet = async () => {
    try {
      const response = await fetchPetAPI(id);
      console.log(response);
      setPet(response);
      setStatus(response.status);
    } catch (err) {
      console.err(err);
    }
  };
  useEffect(() => {
    fetchPet();
  }, []);
  const [serviceData, setServiceData] = useState([
    {
      id: 1,
      service_name: "Bath & Grooming",
      pet_type: "Dog",
      status: "completed",
      staff_name: "Sarah Johnson",
      img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    }
  ]);

  const getStatusColor = (status) => {
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
  const getStatusText = (status) => {
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
  const getRoomStatusColor = (status) => {
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
  const navigate = useNavigate();

  const handleSave = () => {
    createNotification({
      status: "warning", 
      header: "Confirmation", 
      text: "Are you sure?", 
      onClick: async () => {
        try {
          const { scheduled, stayed, ...updatePet } = pet;
          updatePet.status = status; 
          console.log("update pet", updatePet);
          updatePetAPI(id, updatePet);
          setPet(updatePet);
          createNotification("success", "Update Successful", "Pet details have been saved.");
          navigate("/staff/pet status");
        } catch(error) {
          console.error("Interceptor handled the update error:", error);
        }
      }
    })
  };
  const handleCancel = () => {
    createNotification("warning", "Confirmation", "Back to status page?", () => {
      navigate("/staff/pet status");

    })
  };

  return (
    <motion.div 
      className="p-6 max-w-8xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--dark-brown-color)]"></h1>
      </div>
      <div></div>
      {/* Columns */}
      <div className="flex gap-8">
        {/* Left Column */}
        <motion.div 
          className="flex flex-col flex-1 justify-between"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* My Pets */}
          <div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-sleek">
              {<PetCard pet={pet} />}
            </div>
          </div>

          {/* Room Booking */}
          <div className="mt-8">
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              <StatusUpdate
                handleSave={handleSave}
                handleCancel={handleCancel}
                status={status}
                setStatus={setStatus}
              />
            </div>
          </div>
        </motion.div>
        {/* Right Column */}
        <motion.div 
          className="flex-1 flex flex-col"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-[var(--cream-color)] p-10 rounded-lg shadow-md flex-1 flex flex-col">
            <h2 className="text-2xl font-bold mb-6">History</h2>
            <div className="space-y-6 overflow-y-auto pr-2 scrollbar-sleek">
              {serviceData.map((service, index) => (
                <div key={service.id}>
                  <ServiceCard
                    service={service}
                    getStatusText={getStatusText}
                    getStatusColor={getRoomStatusColor}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const PetCard = ({ pet }) => {
  return (
    <motion.div 
      className="bg-[var(--cream-color)] rounded-lg p-6 shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start space-x-6">
        <div className="w-64 h-64 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
          <img
            src={pet.picture}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-bold">{pet.name}</h3>
          <p className="text-base">
            <span className="font-semibold">Pet type:</span> {pet.type}
          </p>
          <p className="text-base">
            <span className="font-semibold">Pet breed:</span> {pet.breed}
          </p>
          <p className="text-base">
            <span className="font-semibold">Pet gender:</span> {pet.sex}
          </p>
          <p className="text-base">
            <span className="font-semibold">Food allergy:</span> {pet.allergic}
          </p>
          <p className="text-base">
            <span className="font-semibold">Medical condition:</span>{" "}
            {pet.disease}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const StatusUpdate = ({ handleSave, handleCancel, status, setStatus }) => {
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  return (
    <div className="bg-[var(--cream-color)] rounded-lg p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <h2 className="text-2xl font-bold text-[var(--dark-brown-color)]">
          Add Status
        </h2>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        {/* Status Dropdown */}
        <div className="flex flex-row justify-start">
          <label className="font-semibold mb-1 mr-4">Status:</label>
          <select
            className="py-1 px-1 text-center p-2 border rounded-lg focus:ring-2 focus:ring-[var(--dark-brown-color)] focus:outline-none transition-all duration-200"
            value={status}
            onChange={handleStatusChange}
          >
            <option>IDLE</option>
            <option>CHECKED_IN</option>
            <option>CHECKED_OUT</option>
            <option>QUEUE</option>
            <option>IN_PROGRESS</option>
            <option>COMPLETED</option>
          </select>
        </div>

        {/* Note Input */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Note:</label>
          <textarea
            rows="4"
            placeholder="Write a note here..."
            className="p-2 border rounded-lg focus:ring-2 focus:ring-[var(--dark-brown-color)] focus:outline-none resize-none transition-all duration-200"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex-1">
          <motion.button
            className="bg-[var(--dark-brown-color)] !text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition cursor-pointer"
            onClick={() => handleSave()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
          <motion.button
            className="px-5 py-2 rounded-lg hover:bg-opacity-90 transition cursor-pointer"
            onClick={() => handleCancel()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </div>
  );
};

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
export default PetUpdate;
