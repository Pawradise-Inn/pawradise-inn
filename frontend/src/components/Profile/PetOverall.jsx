import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom";
import { fetchAllServicesAPI } from "../../hooks/serviceAPI";
import { fetchAllBookedServiceAPI } from "../../hooks/bookedServiceAPI";
import { fetchMyBookingAPI } from "../../hooks/bookingAPI";
import { fetchPetAPI } from "../../hooks/petAPI";

const PetOverall = () => {
    const { id } = useParams();
    const {user, setUser} = useOutletContext();
    const [pet, setPet] = useState([])
    const [scheduled, setScheduled] = useState([])
    const [service, setService] = useState([])
    const [booking, setBooking] = useState([])
    const [roomBookings, setRoomBookings] = useState([])
    const [serviceData, setServiceData] = useState([])
    const [myBooking, setMyBooking] = useState([])
    const fetchData = async () => {
        try{
            const response = await fetchAllServicesAPI();
            setService(response.data);
            const response2 = await fetchAllBookedServiceAPI();
            setBooking(response2.data);
            const response3 = await fetchMyBookingAPI();
            setMyBooking(response3.data)
        } catch (err){
            console.error(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    console.log("my booking: ", myBooking)
    useEffect(() => {
        if (!user) return;

        const currentPet = user.pets.find(p => p.id === Number(id));
        if (!currentPet) return;

        setPet(currentPet);
        console.log(currentPet);

        // Get all unique booking IDs from the scheduled array
        const allBookingId = currentPet.scheduled
            .filter(sch => sch.booking_id) // Add a filter to handle items without a booking_id
            .map(sch => sch.booking_id);

        // Get all unique service IDs from the scheduled array
        const allServiceId = currentPet.scheduled
            .filter(sch => sch.serviceId) // Add a filter to handle items without a serviceId
            .map(sch => sch.serviceId);

        // Filter bookings that belong to this pet
        const matchedRoomBookings = booking.filter(b => allBookingId.includes(b.id));
        setRoomBookings(matchedRoomBookings);

        // Filter services that belong to this pet
        const matchedServiceData = service.filter(s => allServiceId.includes(s.id));
        setServiceData(matchedServiceData);

    }, [user, booking, service, id]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-600';
            case 'in_progress': return 'bg-blue-600';
            case 'available': return 'bg-gray-600';
            case 'unavailable': return 'bg-red-600';
            default: return 'bg-gray-600';
        }
    }
    const getStatusText = (status) => {
        switch(status) {
        case 'completed': return 'Completed';
        case 'in_progress': return 'In Progress';
        case 'available': return 'Available';
        case 'unavailable': return 'Unavailable';
        default: return status;
        }
    };
    const getRoomStatusColor = (status) => {
        switch(status) {
        case 'full': return 'bg-red-600';
        case 'reserved': return 'bg-yellow-600';
        case 'available': return 'bg-green-600';
        default: return 'bg-gray-600';
        }
    };

    return(
        <div className="p-6 max-w-8xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--dark-brown-color)]">
                    Pawradise/My Profile
                </h1>
            </div>
            <div></div>
            {/* Columns */}
            <div className="flex gap-8">
                {/* Left Column */}
                <div className="flex flex-col flex-1 justify-between">
                    {/* My Pets */}
                    <div>

                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-sleek">
                            {<PetCard pet={pet}/>}
                        </div>
                    </div>
                    
                    {/* Room Booking */}
                    <div className="mt-8">
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 scrollbar-sleek">
                            {roomBookings.map(room => (<BookingCard key={room.id} room={room} getRoomStatusColor={getRoomStatusColor}/>))}
                        </div>
                    </div>
                </div>
                 {/* Right Column */}
                <div className="flex-1 flex flex-col">
                    <div className="bg-[var(--cream-color)] p-10 rounded-lg shadow-md flex-1 flex flex-col">
                        <h2 className="text-2xl font-bold mb-6">Service status</h2>
                        <div className="space-y-6 overflow-y-auto pr-2 scrollbar-sleek" >
                            {serviceData.map(service => (<ServiceCard key={service.id} service={service} getStatusText={getStatusText} getStatusColor={getRoomStatusColor} />))}
                        </div>
                    </div>
                </div>
                
            </div>
           
        </div>
    )
}

const PetCard = ({pet}) => {
    return(
        <div className="bg-[var(--cream-color)] rounded-lg p-6 shadow-lg">
            <div className="flex items-start space-x-6">
                <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                        src={pet.img}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold">{pet.name}</h3>
                    <p className="text-base"><span className="font-semibold">Pet type:</span> {pet.type}</p>
                    <p className="text-base"><span className="font-semibold">Pet breed:</span> {pet.breed}</p>
                    <p className="text-base"><span className="font-semibold">Pet gender:</span> {pet.gender}</p>
                    <p className="text-base"><span className="font-semibold">Food allergy:</span> {pet.food_allergy}</p>
                    <p className="text-base"><span className="font-semibold">Medical condition:</span> {pet.medical_condition}</p>
                </div>
            </div>
        </div>
    )
}

const BookingCard = ({room, getRoomStatusColor}) => {
    return(
        <div className="bg-[var(--cream-color)] rounded-lg p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
                <h2 className="text-2xl font-bold">Room Status</h2>
                <span className={`px-3 py-1 !text-white text-lg rounded font-bold ${getRoomStatusColor(room.status)}`}>
                    {room.status}
                </span>
            </div>
            <div className="flex items-start space-x-6">
                <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                        src={room.img}
                        alt="Room"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold">Room {room.room_number}</h3>
                    <p className="text-base"><span className="font-semibold">Pet:</span> {room.pet_name}</p>
                    <p className="text-base">For {room.pet_type}</p>
                    <p className="text-base">(Entry to end date)</p>
                    <p className="text-base">{room.entry_date} to {room.end_date}</p>
                </div>
            </div>
        </div>
    )
}

const ServiceCard = ({service, getStatusText, getStatusColor}) => {
    return(
        <div className="bg-[var(--light-brown-color)] rounded-lg p-4 shadow-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden ">
                        <img 
                            src={service.img}
                            alt={service.staff_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <p className="text-sm">{service.petType[0]}</p>
                        <p className="text-sm">{service.status === 'available' || service.status === 'unavailable' ? service.status : `by - ${service.staff_name}`}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 text-white text-sm rounded-full ${getStatusColor(service.status)}`}>
                    {getStatusText(service.status)}
                </span>
            </div>
        </div>
    )
}
export default PetOverall;