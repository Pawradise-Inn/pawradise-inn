// src/pages/room/add_room.jsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNotification } from "../../context/notification/NotificationProvider";
import { fetchPetTypesAPI } from "../../hooks/petAPI";
import DropDownList from "../DropDownList";
import testImage from "../../assets/test.png";

const AddRoomPopup = ({
  title = "Add room",
  initialData = null,
  onClose,
  onSave,
  onDelete,
  ...motionProps
}) => {
  const { createNotification } = useNotification();

  // Normalized id (backend uses id, legacy code uses roomId)
  const roomId = initialData?.id ?? initialData?.roomId ?? null;

  const [name, setName] = useState(initialData?.name ?? "");
  const [petType, setPetType] = useState(
    initialData?.petType ?? initialData?.forWhich ?? ""
  );
  const [price, setPrice] = useState(
    initialData?.price !== undefined ? String(initialData.price) : ""
  );
  const [capacity, setCapacity] = useState(
    initialData?.capacity !== undefined
      ? String(initialData.capacity)
      : initialData?.maxsize !== undefined
      ? String(initialData.maxsize)
      : ""
  );
  const [image, setImage] = useState(
    initialData?.picture ?? initialData?.image ?? ""
  );

  const [petTypeOptions, setPetTypeOptions] = useState([]);

  // Sync state when initialData changes (edit mode)
  useEffect(() => {
    setName(initialData?.name ?? "");
    setPetType(initialData?.petType ?? initialData?.forWhich ?? "");
    setPrice(
      initialData?.price !== undefined ? String(initialData.price) : ""
    );
    setCapacity(
      initialData?.capacity !== undefined
        ? String(initialData.capacity)
        : initialData?.maxsize !== undefined
        ? String(initialData.maxsize)
        : ""
    );
    setImage(initialData?.picture ?? initialData?.image ?? "");
  }, [initialData]);

  // Load pet types (DOG, CAT, MOUSE, RABBIT, BIRD)
  useEffect(() => {
    const loadPetTypes = async () => {
      try {
        const response = await fetchPetTypesAPI();
        let types = Array.isArray(response.data) ? response.data : [];
        // Ensure uppercased to match enum
        types = types.map((t) => String(t).toUpperCase());
        setPetTypeOptions(types);

        if (types.length > 0) {
          const current = (petType || "").toUpperCase();
          if (!types.includes(current)) {
            setPetType(types[0]);
          } else {
            setPetType(current);
          }
        }
      } catch (err) {
        console.error("Failed to fetch pet types: ", err);
        // Fallback if API fails
        const fallback = ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"];
        setPetTypeOptions(fallback);
        if (!petType) setPetType(fallback[0]);
      }
    };

    loadPetTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // For now, just preview; actual upload is handled elsewhere if needed
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault?.();

    const trimmedName = name.trim();
    const nPrice = Number(price);
    const nCapacity = Number(capacity);
    const normalizedPetType = (petType || "").toUpperCase();

    if (!trimmedName && !roomId) {
      createNotification(
        "fail",
        "Room name required",
        "Please enter a room name."
      );
      return;
    }

    if (!normalizedPetType) {
      createNotification(
        "fail",
        "Pet Type Required",
        "Please select a pet type."
      );
      return;
    }

    if (!Number.isFinite(nPrice) || nPrice < 0) {
      createNotification(
        "fail",
        "Invalid price",
        "Price must be a non-negative number."
      );
      return;
    }

    if (!Number.isFinite(nCapacity) || nCapacity < 0) {
      createNotification(
        "fail",
        "Invalid capacity",
        "Capacity must be a non-negative number."
      );
      return;
    }

    const payload = {
      name: trimmedName,
      petType: normalizedPetType,
      price: nPrice,
      capacity: nCapacity,
      image,
    };

    onSave && onSave(payload);
  };

  const handleDelete = () => {
    if (!roomId) return;

    createNotification(
      "warning",
      "Confirm Deletion",
      `Are you sure you want to delete room "${name || roomId}"? This cannot be undone.`,
      () => {
        onDelete?.(roomId);
      }
    );
  };

  return (
    <motion.div
      className="bg-white rounded-3xl p-8 w-[680px] max-w-full flex flex-col space-y-6 shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
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
          {/* Room name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room name
            </label>
            <input
              type="text"
              value={name}
              placeholder={roomId ? "(leave blank to keep current)" : ""}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Pet type */}
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
              onChange={(value) => setPetType(String(value).toUpperCase())}
              inputSyle="mt-1 border rounded-md px-3 py-2"
              dropDownStyle="bg-white border border-$var(--brown-color) origin-top translate-y-1"
              arrowColor="var(--light-brown-color)"
              activeColor="var(--service-available-color)"
              focusStyle="outline-none ring border-blue-400"
              element="addRoomType"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
        </div>

        {/* Image */}
        <div className="flex flex-col items-center justify-center">
          <label className="cursor-pointer">
            <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed rounded-md bg-gray-100 relative">
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

      {/* Footer */}
      <div className="flex items-center justify-between">
        {roomId ? (
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

export default AddRoomPopup;
