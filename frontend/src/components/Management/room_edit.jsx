import { useEffect, useMemo, useRef, useState } from "react";
import { useNotification } from "../../context/notification/NotificationProvider";
import DropDownList from "../DropDownList";
import { motion } from "motion/react";
import testImage from "../../assets/test.png";
import { fetchPetTypesAPI } from "../../hooks/petAPI";
import { addRoomAPI } from "../../hooks/roomAPI";
import { uploadImageAPI } from "../../hooks/imageAPI";

const AddRoomPopup = ({
  title = "Add room",
  initialData = null,
  onClose,
  onSave,
  onDelete,
  ...motionProps
}) => {
  const { createNotification } = useNotification();

  const [roomName, setRoomName] = useState(initialData?.name ?? "");
  const [petType, setPetType] = useState(initialData?.type ?? "DOG");
  const [price, setPrice] = useState(
    initialData?.price !== undefined ? String(initialData.price) : ""
  );
  const [capacity, setCapacity] = useState(
    initialData?.capacity !== undefined ? String(initialData.capacity) : ""
  );
  const [image, setImage] = useState(initialData?.picture || null);
  const [imageFile, setImageFile] = useState(null);

  const [petTypeOptions, setPetTypeOptions] = useState([]);
  const createdObjectUrl = useRef(null);
  const isEdit = useMemo(() => Boolean(initialData?.roomId), [initialData]);

  // Sync when editing existing room
  useEffect(() => {
    setRoomName(initialData?.name ?? "");
    setPetType(initialData?.type ?? "DOG");
    setPrice(initialData?.price !== undefined ? String(initialData.price) : "");
    setCapacity(initialData?.capacity !== undefined ? String(initialData.capacity) : "");
    setImage(initialData?.picture || null);
  }, [initialData]);

  // Lock scroll + cleanup image URL
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      if (createdObjectUrl.current) {
        URL.revokeObjectURL(createdObjectUrl.current);
        createdObjectUrl.current = null;
      }
    };
  }, []);

  // Close on ESC
  useEffect(() => {
    const onEsc = (ev) => ev.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  // Load pet types from API (DOG, CAT, MOUSE, RABBIT, BIRD, etc.)
  useEffect(() => {
    const loadPetTypes = async () => {
      try {
        const response = await fetchPetTypesAPI();
        // Expecting response.data to be an array like ["DOG", "CAT", ...]
        const types = Array.isArray(response.data) ? response.data : [];
        // Ensure uppercase as you requested
        const upperTypes = types.map((t) => String(t).toUpperCase());
        setPetTypeOptions(upperTypes);

        // If current petType is not in the list, default to the first option
        if (upperTypes.length > 0 && !upperTypes.includes(petType)) {
          setPetType(upperTypes[0]);
        }
      } catch (err) {
        console.error("Failed to fetch pet types: ", err);
        createNotification(
          "fail",
          "Failed to load pet types",
          "Could not load pet type options. Please try again later."
        );
        // Optional fallback
        const fallbackTypes = ["DOG", "CAT", "MOUSE", "RABBIT", "BIRD"];
        setPetTypeOptions(fallbackTypes);
      }
    };

    loadPetTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (createdObjectUrl.current) {
      URL.revokeObjectURL(createdObjectUrl.current);
      createdObjectUrl.current = null;
    }

    const url = URL.createObjectURL(file);
    createdObjectUrl.current = url;
    setImage(url);
    setImageFile(file); // Store the actual file for upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nPrice = Number(price);
    const nCapacity = Number(capacity);

    if (!roomName.trim()) {
      return createNotification(
        "fail",
        "Room name required",
        "Please enter a room name."
      );
    }

    if (!Number.isFinite(nPrice) || nPrice < 0) {
      return createNotification(
        "fail",
        "Invalid price",
        "Price must be a non-negative number."
      );
    }

    if (!Number.isFinite(nCapacity) || nCapacity < 0) {
      return createNotification(
        "fail",
        "Invalid capacity",
        "Capacity must be a non-negative number."
      );
    }

    if (!petType) {
      return createNotification(
        "fail",
        "Pet type required",
        "Please select a pet type for this room."
      );
    }

    try {
      // Upload image first if there's a file (like in NewPet.jsx)
      let pictureUrl = null;
      if (imageFile) {
        try {
          const uploadResponse = await uploadImageAPI(imageFile);
          console.log("Upload response:", uploadResponse);
          
          // Extract the actual image URL from the response
          pictureUrl = uploadResponse?.message?.details?.imageUrl || null;
          
          if (!pictureUrl) {
            console.error("No imageUrl in response:", uploadResponse);
            throw new Error("Invalid upload response");
          }
          
          console.log("Uploaded image URL:", pictureUrl);
        } catch (imgErr) {
          console.error("Failed to upload image:", imgErr);
          createNotification(
            "warning",
            "Image upload failed",
            "Room will be created without custom image."
          );
        }
      }

      // Call addRoomAPI with backend expected format (no number field)
      const roomData = {
        name: roomName,
        capacity: nCapacity,
        price: nPrice,
        type: petType,
      };

      // Add picture URL if uploaded
      if (pictureUrl) {
        roomData.picture = pictureUrl;
      }

      await addRoomAPI(roomData);
      
      createNotification(
        "success",
        "Room Added",
        "New room has been added successfully"
      );
      
      onSave?.(roomData);
    } catch (err) {
      console.error("Failed to add room:", err);
      createNotification(
        "fail",
        "Failed to add room",
        "Could not add room. Please try again."
      );
    }
  };

  const handleDelete = () => {
    if (!isEdit) return;
    const ok = window.confirm(
      `Delete Room #${initialData.roomId}? This cannot be undone.`
    );
    if (ok) onDelete?.(initialData.roomId);
  };

  return (
    <motion.div
      className="bg-white rounded-3xl p-8 w-[680px] max-w-full flex flex-col gap-6 shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
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

      <form id="room-form" onSubmit={handleSubmit} className="flex gap-6">
        <div className="flex flex-col flex-1 space-y-4">
          {/* Room Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Name
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          {/* Pet type from API */}
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
              step="0.01"
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
            <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed rounded-md bg-gray-100 relative overflow-hidden">
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

          {isEdit && (
            <p className="text-xs text-gray-500 mt-3">
              Editing:{" "}
              <span className="font-mono">Room #{initialData.roomId}</span>
            </p>
          )}
        </div>
      </form>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {isEdit ? (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
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
            type="submit"
            form="room-form"
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