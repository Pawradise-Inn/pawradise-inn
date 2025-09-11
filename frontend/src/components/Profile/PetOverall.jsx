import { useState } from "react"
import { useParams } from "react-router-dom";

const PetOverall = () => {
    const { id } = useParams();
    const [pets, setPets] = useState([
        {
            id: 1,
            name: "Buddy",
            type: "Dog",
            breed: "Golden Retriever", 
            gender: "Male",
            food_allergy: "None",
            medical_condition: "Healthy",
            img: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            name: "Whiskers",
            type: "Cat",
            breed: "Persian",
            gender: "Female", 
            food_allergy: "Fish",
            medical_condition: "Healthy",
            img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 3,
            name: "Max",
            type: "Dog",
            breed: "Beagle",
            gender: "Female", 
            food_allergy: "None",
            medical_condition: "Healthy",
            img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 4,
            name: "Luna",
            type: "Cat",
            breed: "Siamese",
            gender: "Female", 
            food_allergy: "Dairy",
            medical_condition: "Healthy",
            img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 5,
            name: "Charlie",
            type: "Dog",
            breed: "Bulldog",
            gender: "Female", 
            food_allergy: "None",
            medical_condition: "Healthy",
            img: "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        }
    ]);
    const [roomBookings, setRoomBookings] = useState([
        {
            id: 1,
            room_number: "A-12",
            status: "full",
            pet_name: "Buddy",
            pet_type: "Dog",
            entry_date: "2024/08/15",
            end_date: "2024/08/20",
            img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            room_number: "B-05",
            status: "reserved",
            pet_name: "Whiskers", 
            pet_type: "Cat",
            entry_date: "2024/08/22",
            end_date: "2024/08/25",
            img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        }
    ])
    const [serviceData, setServiceData] = useState([
        {
        id: 1,
        service_name: "Bath & Grooming",
        pet_type: "Dog",
        status: "completed",
        staff_name: "Sarah Johnson",
        img: "https://images.unsplash.com/photo-1629135099459-a743b6a2ff0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
        id: 2,
        service_name: "Vet Checkup", 
        pet_type: "Dog",
        status: "in_progress",
        staff_name: "Dr. Mike Wilson",
        img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
        id: 3,
        service_name: "Playtime",
        pet_type: "Dog",
        status: "available", 
        staff_name: "Emma Davis",
        img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
        id: 4,
        service_name: "Training Session",
        pet_type: "Dog",
        status: "unavailable",
        staff_name: "John Smith", 
        img: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        }
    ])
     
    const pet = pets.find(p => p.id === parseInt(id)) || pets[0];

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
                        <h3 className="text-lg font-semibold">{service.service_name}</h3>
                        <p className="text-sm">{service.pet_type}</p>
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