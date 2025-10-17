import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import { updateCustomerAPI } from "../../../../hooks/customerAPI";
import { registerPetAPI } from "../../../../hooks/petAPI";
import { startUpVariants } from "../../../../styles/animation";
import PetInput from "./PetInput";
import RadioInput from "./RadioInput";
import { useNotification } from "../../../../context/notification/NotificationProvider";
import { uploadImageAPI } from "../../../../hooks/imageAPI";
import DropDownList from "../../../DropDownList";

const NewPet = () => {
  const { user, setUser } = useAuth();
  const { createNotification } = useNotification();
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
  const [petImagePreview, setPetImagePreview] = useState("");

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

  // FIXED: Added missing closing bracket for handleImageChange
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, petImage: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result;
        setPetImagePreview(previewUrl);
      };
      reader.readAsDataURL(file);
    }
  }; // <-- Added this bracket

  const handleConfirm = () => {
    // Check for missing form data (initial synchronous validation)
    if (
        !formData.petName ||
        !formData.petGender ||
        !formData.petAge ||
        !formData.petType ||
        !formData.petBreed ||
        !formData.medicalCondition ||
        !formData.foodAllergy ||
        isNaN(formData.petAge)
    ) {
        if(isNaN(formData.petAge)) {
          createNotification(
              "fail",
              "Invalid Age",
              "Please provide a valid number for pet age."
          );
        }
        else{
          createNotification(
            "fail",
            "Fail to create a pet",
            "Please provide all required pet information."
          );
        }
        return; // Stop execution if validation fails
    }

    // Launch confirmation notification, which executes the async logic upon confirmation
    createNotification(
        "warning",
        "Confirmation",
        "Create this new pet?",
        async () => {
            let pictureUrl = "https://storage.googleapis.com/paw_image/unnamed.jpg"; // Default image if no file is selected

        // 1. UPLOAD IMAGE TO GCS
          if (formData.petImage) {
            // This API call sends the file object via multipart/form-data
                  pictureUrl = await uploadImageAPI(formData.petImage);
                  console.log(pictureUrl)
          }
                // 2. PREPARE NEW PET DATA
                const newPet = {
                  name: formData.petName,
                  sex: formData.petGender,
                  age: Number(formData.petAge), // Ensure age is a number
                  type: formData.petType,
                  status: "IDLE", // Assuming IDLE is the initial status
                  breed: formData.petBreed,
                  disease: [formData.medicalCondition],
                  allergic: [formData.foodAllergy],
                  picture: pictureUrl.imageUrl, // **Use the GCS URL here**
                  customerId: user.customer.id,
                };
                console.log(newPet)

                // 3. REGISTER PET IN DATABASE
                // Assuming registerPetAPI handles the actual insertion into the 'pet' table
                // and returns the pet object with its database-generated ID (if needed)
                await registerPetAPI(user.customer.id, newPet); 

                // 4. UPDATE CUSTOMER'S LOCAL PET LIST (DB & Context)
                // Safely get current pets or initialize to an empty array
                const currentPets = user.pets || [];
                
                // Create a NEW array and push the new pet (Avoids mutating state)
                const updatedPetsArr = [...currentPets, newPet]; 
                
                // Prepare the customer object with the updated pets list
                const updatedCustomerData = { ...user, pets: updatedPetsArr }; 

                // 5. UPDATE CUSTOMER IN DB (to link the new pet list)
                await updateCustomerAPI(user.customer.id, updatedCustomerData);

                // 6. UPDATE LOCAL AUTH CONTEXT
                setUser({ ...user, customer: updatedCustomerData });

                // 7. SUCCESS & REDIRECT
                createNotification(
                    "success",
                    "Pet has been created!",
                    "Your pet has been successfully saved."
                );
                navigate("/profile/pet");
            }
)}

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
              src={petImagePreview || "default-placeholder-url"}
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
            <motion.div
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <label className="block text-sm font-semibold mb-2">
                Pet type
              </label>
              <DropDownList
                startText="Select Pet Type"
                value={formData.petType}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, petType: value }));
                }}
                arrowColor="var(--brown-color)"
                inputSyle="shadow-md transition-all duration-300 rounded-lg  px-6 py-4.5  text-sm border-2 border-[var(--dark-brown-color)] bg-[var(--cream-color)]"
                focusStyle="border-gray-400 outline-none"
                options={["DOG", "CAT", "BIRD", "MOUSE", "RABBIT"].map(
                  (type) => ({
                    name: type,
                    value: type,
                  })
                )}
                element="selectPetType"
              />
            </motion.div>
            {fields.map((data, idx) => {
              return (
                <PetInput
                  variants={startUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={idx / 3 + 2.33}
                  key={idx}
                  data={formData[`${data.name}`]}
                  setData={setFormData}
                  name={data.name}
                  label={data.label}
                />
              );
            })}
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
              disabled={!user || !user.id}
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
