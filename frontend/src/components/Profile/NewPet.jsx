import { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addPetAPI, registerPetAPI } from "../../hooks/petAPI";
import { updateCustomerAPI } from "../../hooks/customerAPI";

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

const RadioInput = ({ name, options, selected, onChange }) => {
  return (
    <div className="flex my-6 space-x-6">
      {options.map((opt) => (
        <label
          key={opt}
          className="relative flex items-center space-x-2 cursor-pointer font-semibold"
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={selected === opt}
            onChange={() => onChange(opt)}
            className="hidden peer"
          />

          <div
            className="relative w-10 h-10 border-2 border-[var(--brown-color)] rounded transition-all bg-[var(--cream-color)]
              before:absolute before:top-1/2 before:left-1/2 before:w-8 before:h-0.5 before:bg-[var(--dark-brown-color)]
              before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform
              before:transition-all before:scale-0 peer-checked:before:scale-100"
          ></div>

          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
};



const SelectInput = ({ data, setData, name, options }) => {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{name}</label>
      <select
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full shadow-md px-6 py-4.5  rounded-lg border-2 transition-all duration-300 border-[var(--dark-brown-color)] bg-[var(--cream-color)] focus:border-gray-400 focus:outline-none transition-all duration-300"
      >
        <option value="">Select {name}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};


const NewPet = () => {
    const {user, setUser} = useOutletContext();
    const [petName, setPetName] = useState("")
    const [petType, setPetType] = useState("")
    const [petAge, setPetAge] = useState("")
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
    console.log(user)

    const handleConfirm = () => {
        if(window.confirm('are you sure?') && petName && petGender && petAge && petType && petBreed && medicalCondition && foodAllergy){
            const newPet = {
                name: petName,
                sex: petGender,
                age: Number(petAge),
                type: petType,
                status: "IDLE",
                breed: petBreed,
                disease: [medicalCondition],
                allergic: [foodAllergy],
                picture: 'test.img',
                customerId: user.id
            }
            const newPetsArr = user.pets;
            newPetsArr.push(newPet)
            const newUser = {...user, pets: newPetsArr}
            setUser(newUser);
            registerPetAPI(user.id, newPet);
            updateCustomerAPI(user.id, newUser)
            navigate('/profile/pet')
            

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        {/* Pet gender */}

                        <RadioInput
                                name="gender"
                                options={["MALE", "FEMALE"]}
                                selected={petGender}
                                onChange={setPetGender}
                        />
                       
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Pet name */}
                        <PetInput data={petName} setData={setPetName} name='Pet name'/>
                        {/* { Pet age} */}
                        <PetInput data={petAge} setData={setPetAge} name='Pet age'/>
                        {/* Food allergy */}
                        <PetInput data={foodAllergy} setData={setFoodAllergy} name='Food allergy'/>
                        {/* Pet breed */}
                        <PetInput data={petBreed} setData={setPetBreed} name='Pet breed'/>
                        {/* Medical condition */}
                        <PetInput data={medicalCondition} setData={setMedicalCondition} name='Medical condition'/>
                         {/* Pet type */}
                        <SelectInput data={petType} setData={setPetType} name='Pet type' options={['DOG','CAT','BIRD', "MOUSE", "RABBIT"]} />  
                 
                        

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