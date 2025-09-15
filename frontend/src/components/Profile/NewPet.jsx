import { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addPetAPI } from "../../hooks/petAPI";
import { updateUserAPI } from "../../hooks/userAPI";

const PetInput = ({data, setData, name}) => {
    return(
        <div>
            <label className="block text-sm font-semibold mb-2">{name}</label>
            <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className='w-full shadow-md px-6 py-4 rounded-lg border-2 transition-all duration-300 border-[var(--dark-brown-color)] bg-[var(--cream-color)] focus:border-gray-400 focus:outline-none transition-all duration-300'
            />
        </div>
    )
}

const NewPet = () => {
    const [petName, setPetName] = useState("")
    const [petType, setPetType] = useState("")
    const [petGender, setPetGender] = useState("")
    const [petBreed, setPetBreed] = useState("")
    const [foodAllergy, setFoodAllergy] = useState("")
    const [petImage, setPetImage] = useState(null)
    const [medicalCondition, setMedicalCondition] = useState("")
    const {user, setUser} = useOutletContext()

    const navigate = useNavigate()

    const fileInputRef = useRef(null)

    const handleImageClick = () => {
        fileInputRef.current.click();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPetImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleCancel = () => {
        navigate('/profile/pet');
    }
    const handleConfirm = () => {
        if(window.confirm("add a new pet?")){
            if(!petName || !petGender || !petType || !foodAllergy || !medicalCondition || !petBreed ){
                window.alert('please provide all information');
            }
            else{
                const newPet = {
                    id: user.pets[user.pets.length - 1].id + 1,
                    name: petName,
                    sex: petGender,
                    picture: petImage,
                    type: petType,
                    status: 'Queue',
                    allergic: foodAllergy,
                    disease: medicalCondition,
                    breed: petBreed,
                }
                const userPets = user.pets.concat(newPet)
                addPetAPI(newPet);
                updateUserAPI(user.id, {...user, pets: userPets})
                setUser(prev => ({
                    ...prev,
                    pets: userPets
                }));
                navigate('/profile/pet');
            }
        }

    }


    return (
        <div className="p-8 flex flex-col ">
            <h2 className="text-3xl font-bold mb-8">Add New Pet</h2>
            {/* Main container for image on left and inputs on right */}
            <div className="max-w-4xl bg-white rounded p-8 flex flex-row space-x-8"> 
                {/* Pet Image Section - Left aligned */}
                <div className="flex flex-col items-center justify-start w-1/4"> {/* Adjust width as needed */}
                    <div className="relative w-48 h-48 rounded-full bg-gray-200 shadow-lg flex items-center justify-center cursor-pointer" onClick={handleImageClick}>
                        <img 
                            src={petImage}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <p className="text-sm text-gray-500 mt-2">Click image to change</p>
                </div>

                {/* Pet Details and Buttons Section - Right aligned */}
                <div className="flex-1 flex flex-col"> {/* Takes up remaining space */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Pet name */}
                        <PetInput data={petName} setData={setPetName} name='Pet name'/>
                        {/* Pet gender */}
                        <PetInput data={petGender} setData={setPetGender} name='Pet gender'/>
                        {/* Pet type */}
                        <PetInput data={petType} setData={setPetType} name='Pet type'/>
                        {/* Food allergy */}
                        <PetInput data={foodAllergy} setData={setFoodAllergy} name='Food allergy'/>
                        {/* Pet breed */}
                        <PetInput data={petBreed} setData={setPetBreed} name='Pet breed'/>
                        {/* Medical condition */}
                        <PetInput data={medicalCondition} setData={setMedicalCondition} name='Medical condition'/>
                    </div>

                    {/* Buttons - Right aligned within the input section */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 space-x-4">
                        <button onClick={handleCancel} className=" px-6 py-2 rounded hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                            Cancel
                        </button>
                        <button onClick={handleConfirm} className="!text-white px-6 py-2 bg-amber-800 text-white rounded hover:bg-amber-700 transition-colors duration-300 cursor-pointer">    
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPet;