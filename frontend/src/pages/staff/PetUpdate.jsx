import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNotification } from "../../context/notification/NotificationProvider";
import { fetchPetAPI, fetchPetBookingsAPI, updatePetAPI } from "../../hooks/petAPI";
import { getStatusText, getRoomStatusColor } from "../../components/staff/StatusUtils"
import PetCard from "../../components/staff/PetUpdateCard";
import ServiceCard from "../../components/staff/ServiceCard";
import RoomCard from "../../components/staff/RoomCard";
import DropDownList from "../../components/DropDownList";

import { createCareAPI } from "../../hooks/careAPI";
const PetUpdate = () => {
  const { createNotification } = useNotification();
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [status, setStatus] = useState("");
  const [scheduled, setScheduled] = useState([]);
  const [bookingType, setBookingType] = useState("service");
  const [booking, setBooking] = useState()
  const fetchPet = async () => {
    const response = await fetchPetAPI(id);
    setPet(response.data);
    setStatus(response.data.status);
    setScheduled(response.data.scheduled || []);
  };
  const fetchBooking = async () => {
    const response = await fetchPetBookingsAPI(id);
    setBooking(response.data);
    console.log("res:", response)
  }

  useEffect(() => {
    fetchPet();
    fetchBooking();

  }, []);

  const navigate = useNavigate();

  const handleSave = (selectedBookingId) => {
    if (!selectedBookingId) {
      createNotification("fail", "Error", "Please select a booking");
      return;
    }

    createNotification("warning", "Confirmation", "Are you sure?", async () => {
      try {
        const { scheduled, stayed, ...updatePet } = pet;
        updatePet.status = status;

        // Create Care record based on booking type
        if (bookingType === "room") {
          // Create Care record for room
          await createCareAPI({
            bookedRoomId: selectedBookingId,
            petId: parseInt(id),
            status: status,
          });
        }
        else if (bookingType === "service") {
          // Create Care record for service
          await createCareAPI({
            bookedServiceId: selectedBookingId,
            petId: parseInt(id),
            status: status,
          });
        }

        // Update pet status
        await updatePetAPI(id, updatePet);
        setPet(updatePet);

        createNotification("success", "Success", "Care record created and pet status updated successfully");
        navigate("/staff/pet-status");
      } catch (error) {
        console.error("Error updating status:", error);
        createNotification("fail", "Error", "Failed to update status. Please try again.");
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
              {<PetCard key={pet.id} pet={pet} />}
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
                bookingType={bookingType}
                setBookingType={setBookingType}
                booking={booking}
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
            <div className="space-y-6 pr-2 scrollbar-sleek overflow-y-auto max-h-[600px]">
              {/* Services History */}
              {scheduled && scheduled.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-[var(--dark-brown-color)]">Services</h3>
                  {scheduled.map((sch) => (
                    <div key={`scheduled-${sch.id}`}>
                      <ServiceCard
                        service={sch.service}
                        getStatusText={getStatusText}
                        getStatusColor={getRoomStatusColor}
                      />
                    </div>
                  ))}
                </>
              )}
              
              {/* Rooms History - Only show CHECKED_OUT rooms */}
              {pet.stayed && pet.stayed.filter(stay => stay.status === 'CHECKED_OUT').length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-[var(--dark-brown-color)] mt-4">Rooms</h3>
                  {pet.stayed.filter(stay => stay.status === 'CHECKED_OUT').map((stay) => (
                    <div key={`stayed-${stay.id}`}>
                      <RoomCard
                        room={stay.room}
                        checkIn={stay.checkIn}
                        checkOut={stay.checkOut}
                        status={stay.status}
                      />
                    </div>
                  ))}
                </>
              )}
              
              {(!scheduled || scheduled.length === 0) && (!pet.stayed || pet.stayed.filter(stay => stay.status === 'CHECKED_OUT').length === 0) && (
                <p className="text-gray-500 text-center">No history available</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatusUpdate = ({ handleSave, handleCancel, status, setStatus, bookingType, setBookingType, booking }) => {
  const [selectedBookingId, setSelectedBookingId] = useState("");

  // Define status options for service
  const SERVICE_STATUS = [
    "IDLE",
    "QUEUE",
    "IN_PROGRESS",
    "COMPLETED",
  ];

  // Define status options for booking (room)
  const BOOKING_STATUS = [
    "IDLE",
    "CHECKED_IN",
    "CHECKED_OUT",
  ];

  // Get the appropriate status options based on booking type
  const OPERATE_STATUS = bookingType === "service" ? SERVICE_STATUS : BOOKING_STATUS;

  // Get booking options based on type
  const getBookingOptions = () => {
    if (!booking) return [];

    if (bookingType === "service") {
      return booking.services?.map(service => ({
        name: service.service.name,
        value: service.id
      })) || [];
    } else {
      // Filter out CHECKED_OUT rooms from dropdown
      return booking.rooms?.filter(room => room.status !== 'CHECKED_OUT').map(room => ({
        name: `Room ${room.room.number}`,
        value: room.id
      })) || [];
    }
  };

  const bookingOptions = getBookingOptions();

  // Reset status to IDLE when booking type changes if current status is not in the new list
  useEffect(() => {
    if (!OPERATE_STATUS.includes(status)) {
      setStatus("IDLE");
    }
    // Reset selected booking when type changes
    setSelectedBookingId("");
  }, [bookingType]);

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
        {/* Type Radio Buttons - First Line */}
        <div className="flex flex-row justify-start items-center">
          <label className="font-semibold mr-4">Type:</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="service"
                name="bookingType"
                value="service"
                checked={bookingType === "service"}
                onChange={(e) => setBookingType(e.target.value)}
                className="w-4 h-4 cursor-pointer accent-[var(--dark-brown-color)]"
              />
              <label htmlFor="service" className="cursor-pointer">
                Service
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="room"
                name="bookingType"
                value="room"
                checked={bookingType === "room"}
                onChange={(e) => setBookingType(e.target.value)}
                className="w-4 h-4 cursor-pointer accent-[var(--dark-brown-color)]"
              />
              <label htmlFor="room" className="cursor-pointer">
                Room
              </label>
            </div>
          </div>
        </div>

        {/* Status Dropdown - Second Line */}
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

        {/* Booking Selection Dropdown - Third Line - Always show */}
        <div className="flex flex-row justify-start items-center">
          <label className="font-semibold mb-1 mr-4">
            Booked name:
          </label>
          <DropDownList
            value={selectedBookingId && bookingOptions.length > 0 ? bookingOptions.find(opt => opt.value === selectedBookingId)?.name || "Select" : "Select"}
            options={bookingOptions.length > 0 ? bookingOptions : [{ name: "Select", value: "" }]}
            onChange={(value) => {
              setSelectedBookingId(value);
            }}
            element="selectBooking"
            inputSyle="py-1 px-1 text-center p-2 border rounded-lg min-w-[200px]"
            dropDownStyle="border-2 border-[var(--brown-color)] bg-[var(--light-brown-color)] origin-bottom -translate-y-full top-0 left-0 mb-1"
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
            onClick={() => handleSave(selectedBookingId)}
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
