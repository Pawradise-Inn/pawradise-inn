import { motion } from "motion/react";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { updateCustomerAPI } from "../../../../hooks/customerAPI";
import { registerPetAPI } from "../../../../hooks/petAPI";
import { startUpVariants } from "../../../../styles/animation";
import { handleFormDataChange } from "../../../../utils/handleForm";
import PetInput from "./PetInput";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";

const NewPet = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    petAge: "",
    petGender: "",
    petBreed: "",
    foodAllergy: "",
    petImage: null,
    medicalCondition: "",
  });

  const fields = [
    {
      label: "Pet name",
      name: "petName",
    },
    {
      label: "Pet age",
      name: "petAge",
    },
    {
      label: "Food allergy",
      name: "foodAllergy",
    },
    {
      label: "Pet breed",
      name: "petBreed",
    },
    {
      label: "Medical condition",
      name: "medicalCondition",
    },
  ];

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFormDataChange(e, setFormData);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(user);

  const handleConfirm = () => {
    if (
      window.confirm("are you sure?") &&
      formData.petName &&
      formData.petGender &&
      formData.petAge &&
      formData.petType &&
      formData.petBreed &&
      formData.medicalCondition &&
      formData.foodAllergy
    ) {
      const newPet = {
        name: formData.petName,
        sex: formData.petGender,
        age: Number(formData.petAge),
        type: formData.petType,
        status: "IDLE",
        breed: formData.petBreed,
        disease: [formData.medicalCondition],
        allergic: [formData.foodAllergy],
        picture: "test.img",
        customerId: user.id,
      };
      const newPetsArr = user.pets;
      newPetsArr.push(newPet);
      const newUser = { ...user, pets: newPetsArr };
      setUser(newUser);
      registerPetAPI(user.id, newPet);
      updateCustomerAPI(user.id, newUser);
      navigate("/profile/pet");
    }
  };

  const handleCancel = () => {
    navigate("/profile/pet");
  };

  return (
    <div className="p-8 flex flex-col ">
      <motion.h1
        variants={startUpVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        className="text-3xl font-bold mb-8"
      >
        Add New Pet
      </motion.h1>
      {/* Main container for image on left and inputs on right */}
      <div className="max-w-4xl bg-white rounded p-8 flex flex-row space-x-8">
        {/* Pet Image Section - Left aligned */}
        <motion.div
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={1.33}
          className="flex flex-col items-center justify-start w-1/4"
        >
          {/* Adjust width as needed */}
          <div
            className="relative w-48 h-48 rounded-full bg-gray-200 shadow-lg flex items-center justify-center cursor-pointer"
            onClick={handleImageClick}
          >
            <img
              src={formData.petImage}
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
        </motion.div>

        {/* Pet Details and Buttons Section - Right aligned */}
        <div className="flex-1 flex flex-col">
          {/* Takes up remaining space */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            {/* Pet gender */}
            <RadioInput
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={1.66}
              name="gender"
              options={["MALE", "FEMALE"]}
              selected={formData.petGender}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, petGender: value }))
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((data, idx) => {
              return (
                <PetInput
                  variants={startUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={idx / 3 + 2}
                  key={idx}
                  data={formData[`${data.name}`]}
                  setData={setFormData}
                  name={data.name}
                  label={data.label}
                />
              );
            })}
            {/* Pet type */}
            <SelectInput
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={fields.length / 3 + 2}
              setData={setFormData}
              name="petType"
              label="Pet type"
              options={["DOG", "CAT", "BIRD", "MOUSE", "RABBIT"]}
            />
          </div>
          {/* Buttons - Right aligned within the input section */}
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 space-x-4">
            <button
              onClick={handleCancel}
              className=" px-6 py-2 rounded hover:bg-[var(--light-brown-color)] hover:scale-90 transition-all duration-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="!text-white px-6 py-2 bg-[var(--dark-brown-color)] rounded hover:scale-90 transition-all duration-300 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPet;
