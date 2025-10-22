import { useEffect, useState } from "react";
import DropDownList from "../DropDownList";
import { motion } from "motion/react";
import { useNotification } from "../../context/notification/NotificationProvider";
import { fetchPetTypesAPI } from "../../hooks/petAPI";

const AddServicePopup = ({
  title = "Add service",
  initialData = null,
  onClose,
  onSave,
  onDelete,
  ...motionProps
}) => {
  const { createNotification } = useNotification();

  const [name, setName] = useState(initialData?.name || "");
  const [petType, setPetType] = useState(initialData?.petType?.[0] || "");
  const [price, setPrice] = useState(initialData?.price ?? "");
  const [image, setImage] = useState(initialData?.image || "");
  const [petTypeOptions, setPetTypeOptions] = useState([]);

  useEffect(() => {
    setName(initialData?.name || "");
    setPetType(initialData?.petType?.[0] || "");
    setPrice(initialData?.price ?? "");
    setImage(initialData?.image || "");
  }, [initialData]);

  useEffect(() => {

    const loadPetTypes = async () => {
      try {
        const response = await fetchPetTypesAPI();
        setPetTypeOptions(response.data);
      } catch(err) {
        console.error("Failed to fetch pet types: ", err);
      }
    };
    loadPetTypes();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault?.();
    const payload = { name, petType:[petType], price: Number(price), image };
    onSave && onSave(payload);
  };

  const handleDelete = () => {
    if (!initialData?.id) return;
    
    createNotification(
        "warning",
        "Confirm Deletion",
        `Are you sure you want to delete "${name}"? This cannot be undone.`,
        () => {
          onDelete?.(initialData.id);
        }
    );
  };

  return (
    <motion.div
      className="bg-white rounded-3xl p-8 w-[600px] flex flex-col space-y-6 shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      {...motionProps}
    >
      <div className="flex items-start justify-between">
        <h2 className="text-3xl font-bold text-[var(--dark-brown-color)]">
          {title}
        </h2>
        <button
          className="text-2xl px-3 py-1 rounded hover:bg-gray-100 cursor-pointer transition-all duration-150"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-6">
        <div className="flex flex-col flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pet type
            </label>
            <DropDownList
              startText="Select..."
              options={petTypeOptions.map((type) => ({
                name: type,
                value: type,
              }))}
              value={petType}
              onChange={(value) => setPetType(value)}
              inputSyle="mt-1 border rounded-md px-3 py-2"
              dropDownStyle="bg-white border border-$var(--brown-color) origin-top translate-y-1"
              arrowColor="var(--light-brown-color)"
              activeColor="var(--service-available-color)"
              focusStyle="outline-none ring border-blue-400"
              element="addServiceType"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <label className="cursor-pointer">
            <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed rounded-md bg-gray-200 relative">
              {image ? (
                <img
                  src={image}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-4xl text-gray-500">+</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-center mt-1 text-gray-500">
              click to change pic
            </p>
          </label>
        </div>
      </form>

      {/* Footer with Delete (left) and Cancel/Save (right) */}
      <div className="flex items-center justify-between">
        {/* Show Delete only in Edit mode */}
        {initialData?.id ? (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-red-400 text-white hover:bg-red-700"
          >
            Delete
          </button>
        ) : (
          <span />
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-[var(--light-brown-color)]"
          >
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddServicePopup;
