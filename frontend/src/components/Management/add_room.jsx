import { useEffect, useMemo, useRef, useState } from "react";
import { useNotification } from "../../context/notification/NotificationProvider";

const AddRoomPopup = ({
  title = "Add room",
  initialData = null,
  onClose,
  onSave,
  onDelete,
}) => {
  const { createNotification } = useNotification();
  const [status, setStatus] = useState(initialData?.status ?? "available");
  const [forwhich, setForwhich] = useState(initialData?.forwhich ?? "small");
  const [price, setPrice] = useState(
    initialData?.price !== undefined ? String(initialData.price) : ""
  );
  const [size, setSize] = useState(
    initialData?.size !== undefined ? String(initialData.size) : ""
  );
  const [maxsize, setMaxsize] = useState(
    initialData?.maxsize !== undefined ? String(initialData.maxsize) : ""
  );
  const [image, setImage] = useState(initialData?.image || null);

  const createdObjectUrl = useRef(null);
  const isEdit = useMemo(() => Boolean(initialData?.roomId), [initialData]);

  useEffect(() => {
    setStatus(initialData?.status ?? "available");
    setForwhich(initialData?.forwhich ?? "small");
    setPrice(initialData?.price !== undefined ? String(initialData.price) : "");
    setSize(initialData?.size !== undefined ? String(initialData.size) : "");
    setMaxsize(
      initialData?.maxsize !== undefined ? String(initialData.maxsize) : ""
    );
    setImage(initialData?.image || null);
  }, [initialData]);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validations
    const nPrice = Number(price);
    const nSize = Number(size);
    const nMax = Number(maxsize);
    if (!Number.isFinite(nPrice) || nPrice < 0) {
      return createNotification(
        "fail",
        "Invalid price",
        "Price must be a non-negative number."
      );
    }

    if (!Number.isFinite(nSize) || nSize < 0) {
      return createNotification(
        "fail",
        "Invalid current size",
        "Current size must be a non-negative number."
      );
    }

    if (!Number.isFinite(nMax) || nMax < 0) {
      return createNotification(
        "fail",
        "Invalid max size",
        "Max size must be a non-negative number."
      );
    }

    if (nSize > nMax) {
      return createNotification(
        "fail",
        "Invalid current size",
        "Current size cannot exceed max size."
      );
    }

    const payload = {
      status,
      forwhich,
      price: nPrice,
      size: nSize,
      maxsize: nMax,
      image, // preview URL; replace with uploaded URL when integrating storage
      // review & pageAmount stay unchanged in parent on edit
    };
    onSave?.(payload);
  };

  const handleDelete = () => {
    if (!isEdit) return;
    const ok = window.confirm(
      `Delete Room #${initialData.roomId}? This cannot be undone.`
    );
    if (ok) onDelete?.(initialData.roomId);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-10 grid place-items-center p-4">
      <div className="bg-white rounded-3xl p-8 w-[680px] max-w-full flex flex-col gap-6 shadow-lg">
        <div className="flex items-start justify-between">
          <h2 className="text-3xl font-bold text-[var(--dark-brown-color)]">
            {title}
          </h2>
          <button
            className="text-2xl px-3 py-1 rounded hover:bg-gray-100"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form id="room-form" onSubmit={handleSubmit} className="flex gap-6">
          <div className="flex flex-col flex-1 space-y-4">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                required
              >
                <option value="available">available</option>
                <option value="full">full</option>
                <option value="maintenance">maintenance</option>
              </select>
            </div>

            {/* For which (pet size/type) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                For which
              </label>
              <select
                value={forwhich}
                onChange={(e) => setForwhich(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                required
              >
                <option value="small">small</option>
                <option value="big">big</option>
              </select>
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

            {/* Size / Max size */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current size
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max size
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={maxsize}
                  onChange={(e) => setMaxsize(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-col items-center justify-center">
            <label className="cursor-pointer">
              <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed rounded-md bg-gray-100 relative overflow-hidden">
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
      </div>
    </div>
  );
};

export default AddRoomPopup;
