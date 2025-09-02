import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPet = () => {
    const [petName, setPetName] = useState("")
    const [petType, setPetType] = useState("")
    const [petGender, setPetGender] = useState("")
    const [petBreed, setPetBreed] = useState("")
    const [foodAllergy, setFoodAllergy] = useState("")
    const [petImage, setPetImage] = useState(null)
    const [medicalCondition, setMedicalCondition] = useState("")

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
                        <div>
                            <label className="block text-sm font-semibold mb-2">Pet name</label>
                            <input
                                type="text"
                                value={petName}
                                onChange={(e) => setPetName(e.target.value)}
                                className='w-full px-6 py-4 rounded-lg border-2 transition-all duration-300 border-gray-200 bg-[var(--cream-color)] focus:border-gray-400 focus:outline-none transition-all duration-300'
                            />
                        </div>
                        {/* Pet gender */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Pet gender</label>
                            <input
                                type="text"
                                value={petGender}
                                onChange={(e) => setPetGender(e.target.value)}
                                className='w-full px-6 py-4 rounded-lg border-2 transition-all duration-300 border-gray-200 bg-[var(--cream-color)] focus:border-gray-400 focus:outline-none transition-all duration-300'
                            />
                        </div>
                        {/* Pet type */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Pet type</label>
                            <input
                                type="text"
                                value={petType}
                                onChange={(e) => setPetType(e.target.value)}
                                className='w-full px-6 py-4 rounded-lg border-2 transition-all duration-300 border-gray-200 bg-[var(--cream-color)] focus:border-gray-400 focus:outline-none transition-all duration-300'
                            />
                        </div>
                        {/* Food allergy */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Food allergy</label>
                            <input
                                type="text"
                                value={foodAllergy}
                                onChange={(e) => setFoodAllergy(e.target.value)}
                                className='w-full px-6 py-4 rounded-lg border-2 transition-all duration-300 border-gray-200 bg-[var(--cream-color)] focus:border-gray-400 focus:outline-none transition-all duration-300'
                            />
                        </div>
                        {/* Pet breed */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Pet breed</label>
                            <input
                                type="text"
                                value={petBreed}
                                onChange={(e) => setPetBreed(e.target.value)}
                                className='w-full px-6 py-4 rounded-lg border-2 transition-all duration-300 border-gray-200 bg-[var(--cream-color)] focus:border-gray-400 focus:outline-none transition-all duration-300'
                            />
                        </div>
                        {/* Medical condition */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Medical condition</label>
                            <input
                                type="text"
                                value={medicalCondition}
                                onChange={(e) => setMedicalCondition(e.target.value)}
                                className='w-full px-6 py-4 rounded-lg border-2 transition-all duration-300 border-gray-200 bg-[var(--cream-color)] focus:border-gray-400 focus:outline-none transition-all duration-300'
                            />
                        </div>
                    </div>

                    {/* Buttons - Right aligned within the input section */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 space-x-4">
                        <button onClick={handleCancel} className="bg-[#d2bba0] px-6 py-2 rounded hover:bg-[#bda890] transition-colors duration-300 cursor-pointer">
                            Cancel
                        </button>
                        <button onClick={() => console.log("Save changes")} className="!text-white px-6 py-2 bg-amber-800 text-white rounded hover:bg-amber-700 transition-colors duration-300 cursor-pointer">    
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPet;