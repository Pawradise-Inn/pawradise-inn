import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useNotification } from "../../context/notification/NotificationProvider";
import { fetchPetAPI, updatePetAPI } from "../../hooks/petAPI";
import {getStatusText, getRoomStatusColor} from "../../components/staff/StatusUtils"
import PetCard from "../../components/staff/PetUpdateCard";
import ServiceCard from "../../components/staff/ServiceCard";
import DropDownList from "../../components/DropDownList";
const PetUpdate = () => {
  const { createNotification } = useNotification();
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [status, setStatus] = useState("");
  const [scheduled, setScheduled] = useState([]);
  const fetchPet = async () => {
    const response = await fetchPetAPI(id);
    setPet(response.data);
    setStatus(response.data.status);
    setScheduled(response.data.scheduled);

    //setServiceData(response.data.scheduled.service)
  };

  useEffect(() => {
    fetchPet();
    console.log(pet);
  }, []);

  const navigate = useNavigate();

  const handleSave = () => {
    createNotification("warning", "Confirmation", "Are you sure?", async () => {
      try {
        const { scheduled, stayed, ...updatePet } = pet;
        updatePet.status = status;
        updatePetAPI(id, updatePet);
        setPet(updatePet);
        createNotification(
          "success",
          "Update Successful",
          "Pet details have been saved."
        );
        navigate("/staff/pet-status");
      } catch (error) {
        console.error("Interceptor handled the update error:", error);
      }
    });
  };
  const handleCancel = () => {
    createNotification(
      "warning",
      "Confirmation",
      "Back to status page?",
      () => {
        navigate("/staff/pet-status");
      }
    );
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
            <div className="space-y-4 max-h-[300px] pr-2 scrollbar-sleek">
              {<PetCard pet={pet} />}
            </div>
          </div>

          {/* Room Booking */}
          <div className="mt-8">
            <div className="space-y-4 max-h-[350px] pr-2">
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
            <div className="space-y-6 pr-2 scrollbar-sleek">
              {scheduled.map((sch, index) => (
                <div key={sch.id}>
                  <ServiceCard
                    service={sch.service}
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

const StatusUpdate = ({ handleSave, handleCancel, status, setStatus }) => {
  const OPERATE_STATUS = [
    "IDLE",
    "CHECKED_IN",
    "CHECKED_OUT",
    "QUEUE",
    "IN_PROGRESS",
    "COMPLETED",
  ];

  return (
    <div className="bg-[var(--cream-color)] rounded-lg p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <h2 className="text-2xl font-bold text-[var(--dark-brown-color)]">
          Change status
        </h2>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        {/* Status Dropdown */}
        <div className="flex flex-row justify-start items-center">
          <label className="font-semibold mb-1 mr-4">Status:</label>
          <DropDownList
            value={getStatusText(status)}
            options={OPERATE_STATUS.map((os) => ({ name: getStatusText(os), value: os }))}
            onChange={(value) => {
              setStatus(value);
            }}
            element="changeStatus"
            inputSyle="py-1 px-1 text-center p-2 border rounded-lg"
            dropDownStyle="border-2 border-[var(--brown-color)] bg-[var(--light-brown-color)]  origin-bottom -translate-y-full top-0 left-0 mb-1"
            focusStyle="outline-none ring-[var(--dark-brown-color)] ring-2"
            arrowColor="var(--dark-brown-color)"
          />
        </div>

        {/* Note Input */}
        {/* <div className="flex flex-col">
          <label className="font-semibold mb-1">Note:</label>
          <textarea
            rows="4"
            placeholder="Write a note here..."
            className="p-2 border rounded-lg focus:ring-2 focus:ring-[var(--dark-brown-color)] focus:outline-none resize-none transition-all duration-200"
          ></textarea>
        </div> */}

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

export default PetUpdate;
