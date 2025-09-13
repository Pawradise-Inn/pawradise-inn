import { useState } from "react"
import { NavLink } from "react-router-dom";

const Pet_card = ({pet}) => {
    return (
        <div>
            <NavLink to={`/staff/pet/${pet.id}`}>
                <div className="mx-5 bg-[var(--cream-color)] border-1 border-color-[var(--dark-brown-color)] rounded-xl p-4 shadow-lg flex flex-col space-y-4 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer">
                    
                    <div className="w-full aspect-square bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
                        <img 
                            src={pet.img}
                            alt="pet"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex justify-between mb-3">
                            <div className="text-center">
                                <p className="text-xl font-semibold">{pet.name}</p>
                            </div>
                            <span className="px-5 py-1 !text-white text-xs rounded-full bg-[var(--dark-brown-color)] font-semibold">
                                🔴 pet_status
                            </span>   
                    </div>
                </div>\
            </NavLink>
        </div>
        
    )
}


const PetStatus = () => {
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

    const [filters, setFilter] = useState([])
    const [search, setSearch] = useState("")

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        if(e.target.checked){
            setFilter([...filters, value])
        }else{
            setFilter(filters.filter(f => f != value))
        }
    }

    const filterPets = pets.filter(pet => pet.name.toLowerCase().includes(search.toLowerCase()))
    return (
        <div className="mt-8 flex flex-col items-center">
            <b className="text-7xl text-center block m-8 mt-0">Pet Status</b>
            <hr className="lg:w-300 md:w-175 sm:w-100 border-1 border-[var(--brown-color)] mt-2 mb-3" />
            <div className="flex mx-5 items-center space-x-6">
                <div className="flex my-8 mx-15 border-2 rounded-4xl px-10 py-2 text-3xl w-64 sm:w-80 md:w-[400px] lg:w-[600px]">
                    <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center "></i>
                    <input
                        className="w-full outline-0 placeholder:opacity-75"
                        placeholder="search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    
                </div>
                <div class="flex my-6 space-x-6">
                    <label class="relative flex items-center space-x-2 cursor-pointer font-semibold">
                        <input type="checkbox" value="book" onChange={handleCheckboxChange} class="hidden peer" />

                        <div class="relative w-10 h-10 border-2 border-[var(--brown-color)] rounded transition-all bg-[var(--cream-color)] 
                                    before:absolute before:top-1/2 before:left-1/2 before:w-8 before:h-0.5 before:bg-[var(--dark-brown-color)] 
                                    before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform 
                                    before:transition-all before:scale-0 peer-checked:before:scale-100">
                        </div>
                        
                        <span >book</span>
                    </label>

                    <label class="relative flex items-center space-x-2 cursor-pointer font-semibold">
                        <input type="checkbox" value="service" onChange={handleCheckboxChange} class="hidden peer" />

                        <div class="relative w-10 h-10 border-2 border-[var(--brown-color)] rounded transition-all bg-[var(--cream-color)]
                                    before:absolute before:top-1/2 before:left-1/2 before:w-8 before:h-0.5 before:bg-[var(--dark-brown-color)] 
                                    before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform 
                                    before:transition-all before:scale-0 peer-checked:before:scale-100">
                        </div>
                        
                        <span>service</span>
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6 max-w-7xl mx-32 my-8">
                {filterPets.map(pet => <Pet_card key={pet.id} pet={pet}/>)}
                    
            </div>
        </div>
    )

}

export default PetStatus;