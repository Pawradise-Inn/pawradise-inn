import { motion } from "motion/react";

const CancelModal = ({ booking, onConfirm, onCancel, ...motionProps }) => {
  return (
    <motion.div className="fixed w-dvw h-dvh top-0 left-0  z-20 overflow-auto" {...motionProps}>
      {/* Modal Box */}
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
          {/* Modal Header */}
          <div className="bg-[var(--brown-color)] p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center !text-[var(--cream-color)]">
                <span className="mr-3 text-3xl">⚠️</span>
                Cancel Booking
              </h2>
              <button
                onClick={onCancel}
                className="!text-white hover:!text-gray-300 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-700 text-lg mb-4">
                Are you sure you want to cancel this booking?
              </p>

              {/* Booking Details */}
              <div className="bg-[var(--cream-color)] rounded-lg p-4 space-y-2">
                <div className="flex items-center">
                  <img
                    src={booking.img}
                    alt={booking.pet_name}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {booking.service_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Pet: {booking.pet_name} ({booking.pet_type})
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {booking.statuse}
                    </p>
                  </div>
                </div>
              </div>

              <p className="!text-amber-600 text-sm mt-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                This action cannot be undone.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium
                                         hover:bg-gray-300 transition-all duration-200 transform hover:scale-105"
              >
                Keep Booking
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium
                                         hover:bg-red-600 transition-all duration-200 transform hover:scale-105
                                         shadow-lg hover:shadow-xl"
              >
                Yes, Cancel It
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default motion.create(CancelModal);
