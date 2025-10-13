import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import { updateCustomerAPI } from "../../../../hooks/customerAPI";
import { registerPetAPI } from "../../../../hooks/petAPI";
import { startUpVariants } from "../../../../styles/animation";
import { handleFormDataChange } from "../../../../utils/handleForm";
import PetInput from "./PetInput";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import { useNotification } from "../../../../context/notification/NotificationProvider";
import { uploadImageAPI } from "../../../../hooks/imageAPI";

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
    //console.log(user)

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

  //console.log(user);

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
        isNaN(formData.age)
    ) {
        if(isNaN(formData.age)) {
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
            let pictureUrl = "default.img"; // Default image if no file is selected

            try {
                // 1. UPLOAD IMAGE TO GCS
                if (formData.petImage) {
                    // This API call sends the file object via multipart/form-data
                    const uploadResponse = await uploadImageAPI(formData.petImage);
                    
                    // Store the public GCS URL returned by the backend
                    pictureUrl = uploadResponse.imageUrl; 
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
                    picture: pictureUrl, // **Use the GCS URL here**
                    customerId: user.customer.id,
                };

                // 3. REGISTER PET IN DATABASE
                // Assuming registerPetAPI handles the actual insertion into the 'pet' table
                // and returns the pet object with its database-generated ID (if needed)
                await registerPetAPI(user.customer.id, newPet); 

                // 4. UPDATE CUSTOMER'S LOCAL PET LIST (DB & Context)
                // Safely get current pets or initialize to an empty array
                const currentPets = user.customer.pets || [];
                
                // Create a NEW array and push the new pet (Avoids mutating state)
                const updatedPetsArr = [...currentPets, newPet]; 
                
                // Prepare the customer object with the updated pets list
                const updatedCustomerData = { ...user.customer, pets: updatedPetsArr }; 

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

            } catch (error) {
                // Catch any API errors during upload, registration, or update
                console.error("Pet creation failed:", error);
                createNotification(
                    "fail",
                    "Operation Failed",
                    "An error occurred during pet creation. Please try again."
                );
            }
        }
    );
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