import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { useNotification } from "../../context/notification/NotificationProvider";
import { fetchPetTypesAPI } from "../../hooks/petAPI";
import testImage from "../../assets/test.png";

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
  const [petTypes, setPetTypes] = useState(initialData?.petType || []);
  const [price, setPrice] = useState(initialData?.price ?? "");
  const [image, setImage] = useState(initialData?.image || "");
  const [petTypeOptions, setPetTypeOptions] = useState([]);
  const [showPetTypeDropdown, setShowPetTypeDropdown] = useState(false);
  const petTypeDropdownRef = useRef(null);

  useEffect(() => {
    setName(initialData?.name || "");
    setPetTypes(initialData?.petType || []);
    setPrice(initialData?.price ?? "");
    setImage(initialData?.image || "");
  }, [initialData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (petTypeDropdownRef.current && !petTypeDropdownRef.current.contains(event.target)) {
        setShowPetTypeDropdown(false);
      }
    }
    if (showPetTypeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPetTypeDropdown]);

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

  const handlePetTypeToggle = (type) => {
    setPetTypes(prev => {
      if (prev.includes(type)) {
        // Remove if already selected
        return prev.filter(t => t !== type);
      } else {
        // Add if not selected
        return [...prev, type];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault?.();
    if (petTypes.length === 0) {
      createNotification("fail", "Pet Type Required", "Please select at least one pet type.");
      return;
    }
    const payload = { name, petType: petTypes, price: Number(price), image };
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet type {petTypes.length > 0 && `(${petTypes.length} selected)`}
            </label>
            <div className="relative" ref={petTypeDropdownRef}>
              <button
                type="button"
                onClick={() => setShowPetTypeDropdown(!showPetTypeDropdown)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-400 flex items-center justify-between"
              >
                <span className={petTypes.length === 0 ? "text-gray-500" : ""}>
                  {petTypes.length === 0 
                    ? "Select pet types..." 
                    : petTypes.join(", ")}
                </span>
                <i className={`bi bi-caret-${showPetTypeDropdown ? 'up' : 'down'}-fill text-gray-500`}></i>
              </button>
              
              {showPetTypeDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {petTypeOptions.map((type) => {
                    const isSelected = petTypes.includes(type);
                    return (
                      <label
                        key={type}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handlePetTypeToggle(type)}
                          className="mr-3 h-4 w-4 text-[var(--brown-color)] focus:ring-[var(--brown-color)] border-gray-300 rounded"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
            {petTypes.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {petTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-[var(--light-brown-color)] text-sm"
                  >
                    {type}
                    <button
                      type="button"
                      onClick={() => handlePetTypeToggle(type)}
                      className="ml-2 text-gray-600 hover:text-gray-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
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
                  src={image || testImage}
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
