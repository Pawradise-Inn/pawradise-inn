import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchPetAPI } from "../../../../hooks/petAPI";
import { startUpVariants } from "../../../../styles/animation";
import ServiceCard from "../../myPet/petOverAll/ServiceCard";
import BookingCard from "./BookingCard";
import PetCard from "./PetCard";
import { useAuth } from "../../../../context/AuthProvider";

const PetOverall = () => {
  const { id } = useParams();
  const { user, setUser } = useAuth();
  const [pet, setPet] = useState([]);
  const [service, setService] = useState([]);
  const [booking, setBooking] = useState([]);
  const [stayed, setStayed] = useState([]);
  const [scheduled, setScheduled] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetchPetAPI(id);
      setPet(response.data);
      setStayed(response.data.stayed || []);
      setScheduled(response.data.scheduled || []);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "IDLE":         
        return "bg-blue-100 text-blue-800";
      case "QUEUE":        
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":  
        return "bg-orange-100 text-orange-800";
      case "COMPLETE":     
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "IDLE":
        return "Idle";
      case "QUEUE":
        return "Queue";
      case "IN_PROGRESS":
        return "In progress";
      case "COMPLETE":
        return "Completed";
      default:
        return status;
    }
  };
  const getRoomStatusColor = (status) => {
    switch (status) {
      case "full":
        return "bg-red-100 text-red-800 border border-red-200";
      case "reserved":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "available":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="p-6 max-w-8xl">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-3xl font-bold text-[var(--dark-brown-color)]"
        >
          {pet.name}'s Overview
        </motion.h1>
      </div>
      <div></div>
      {/* Columns */}
      <div className="flex gap-8">
        {/* Left Column */}
        <div className="flex flex-col flex-1 justify-between">
          {/* My Pets */}
          <div>
            <motion.div
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={1.33}
              className="space-y-4 max-h-[300px] pr-2 scrollbar-sleek"
            >
              {<PetCard pet={pet} />}
            </motion.div>
          </div>

          {/* Room Booking */}
          <motion.div
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={1.66}
            className="mt-8"
          >
            {stayed.length > 0 && (
                <div className="space-y-4 max-h-[350px] pr-2 scrollbar-sleek">
                {stayed.map((s) => (
                  <BookingCard
                    key={s.room.id}
                    room={s.room}
                    pet={pet}
                    getRoomStatusColor={getRoomStatusColor}
                    checkIn={s.checkIn}
                    checkOut={s.checkOut}
                  />
                ))}
              </div>
            )}
            
          </motion.div>
        </div>
        {/* Right Column */}
        <motion.div
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="flex-1 flex flex-col"
        >
          {scheduled.length > 0 && (
              <div className="bg-[var(--cream-color)] p-10 rounded-lg shadow-md flex-1 flex flex-col">
              <div className="space-y-6 pr-2 scrollbar-sleek">
                {scheduled.map((sch) => (
                  <ServiceCard
                    key={sch.id}
                    service={sch.service}
                    pet={pet}
                    getStatusText={getStatusText}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </div>
            </div>
          )}
          
        </motion.div>
      </div>
    </div>
  );
};

export default PetOverall;
