import { useState } from "react";
import { NavLink } from "react-router-dom";

const Pet_card = ({pet}) => {
    return (
        <div>
            <NavLink to={`/profile/pet/${pet.id}`}>
                <div className="bg-[var(--cream-color)] rounded p-4 shadow-lg flex flex-col space-y-4 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer">
                    <div className="w-full h-full bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
                        <img 
                            src={pet.img}
                            alt="pet"
                            className="w-full h-64 object-cover"
                        />
                    </div>
                    <div className="flex justify-between mb-3">
                            <span className="px-5 py-1 !text-white text-xs rounded-full bg-[var(--dark-brown-color)] font-semibold">
                                🔴 pet_status
                            </span>
                            <div className="text-center">
                                <p className="text-xl font-semibold">{pet.name}</p>
                            </div>
                    </div>
                    
                </div>
                
            </NavLink>
        </div>
        
    )
}

const Pet_comp = () => {
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

    const handleClickPet = (pet_id) => {
        return 
    }

    return(
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-8xl">
                {pets.map(pet => <Pet_card key={pet.id} pet={pet}/>)}
                <div 
                    className="bg-[var(--cream-color)] rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400"
                >
                    <div className="w-full h-full rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-6xl !text-gray-400">+</div>
                    </div>
                </div>
                    
            </div>
            
        </div>
        
        
    )
}
export default Pet_comp;