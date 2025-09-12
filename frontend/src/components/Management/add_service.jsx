import { useState } from "react";

const AddServicePopup = ({ onClose, onSave }) => {
  const [serviceName, setServiceName] = useState("");
  const [petType, setPetType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = { serviceName, petType, price, image };
    if (onSave) onSave(newService);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-8 w-[600px] flex flex-col space-y-6 shadow-lg">
        {/* Header */}
        <h2 className="text-3xl font-bold text-[var(--dark-brown-color)]">
          Add service
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex gap-6">
          <div className="flex flex-col flex-1 space-y-4">
            {/* Service name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service name
              </label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>

            {/* Pet type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pet type
              </label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                required
              >
                <option value="">Select...</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Price */}
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

          {/* Image Upload */}
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

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="service-form"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServicePopup;
