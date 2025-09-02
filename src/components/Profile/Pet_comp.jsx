import { useState } from "react";

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
        }
    ]);
    return(
        <div>

        </div>
    )
}
export default Pet_comp;