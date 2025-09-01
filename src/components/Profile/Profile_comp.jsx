import { useState } from "react"

const Profile_comp = () => {
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
        }
    ])
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
        pet_type: "Cat",
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
        <div>
            {/* Header */}
            <div>
                <h1>
                    Pawradise/My Profile
                </h1>
            </div>
            <div>
                {/* Left Column */}
                <div>
                    {/* My Pets */}
                    <div>
                        <div>
                            {pets.map(pet => (<PetCard key={pet.id} pet={pet}/>))}
                        </div>
                    </div>
                    {/* Room Booking */}
                    <div>
                        <div>
                            {roomBookings.map(room => (<BookingCard key={room.id} room={room}/>))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Column */}
            <div>
                <h2>Service status</h2>
                <div>
                    {serviceData.map(service => (<ServiceCard key={service.id} service={service} getStatusText={getStatusText} />))}
                </div>
            </div>
        </div>
    )
}

const PetCard = ({pet}) => {
    return(
        <div>
            <div>
                <div>
                    <img 
                        src={pet.img}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h3>{pet.name}</h3>
                    <p><span>Pet type:</span> {pet.type}</p>
                    <p><span>Pet breed:</span> {pet.breed}</p>
                    <p><span>Pet gender:</span> {pet.gender}</p>
                    <p><span>Food allergy:</span> {pet.food_allergy}</p>
                    <p><span>Medical condition:</span> {pet.medical_condition}</p>
                </div>
            </div>
        </div>
    )
}

const BookingCard = ({room}) => {
    return(
        <div>
            <div>
                <h3>Room {room.room_number}</h3>
                <span>{room.status}</span>
            </div>
            <div>
                <div>
                    <img 
                        src={room.img}
                        alt="Room"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <p>Pet : {room.pet_name}</p>
                    <p>For {room.pet_type}</p>
                    <p>(Entry to end date)</p>
                    <p>{room.entry_date} to {room.end_date}</p>
                </div>
            </div>
        </div>
    )
}

const ServiceCard = ({service, getStatusText}) => {
    return(
        <div>
            <div>
                <div>
                    <div>
                        <img 
                            src={service.img}
                            alt={service.staff_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3>{service.service_name}</h3>
                        <p>{service.pet_type}</p>
                        <p>{service.status === 'available' || service.status === 'unavailable' ? service.status : `by - ${service.staff_name}`}</p>
                    </div>
                </div>
                <span>
                    {getStatusText(service.status)}
                </span>
            </div>
        </div>
    )
}
export default Profile_comp;