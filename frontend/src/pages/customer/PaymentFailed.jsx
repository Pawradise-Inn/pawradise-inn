import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// --- Animation Variants ---
const startUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

// Inline SVG for failure icon
const FailureCrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="w-32 h-32 sm:w-48 sm:h-48"
  >
    <circle cx="12" cy="12" r="11" fill="#F87171" />
    <path
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      d="M8.5 8.5l7 7m0-7l-7 7"
    />
  </svg>
);

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const total = location.state?.total || 0.0;
  const paymentId = location.state?.paymentId || null; // ✅ grab paymentId

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white p-4 sm:p-8 font-['Inter',_sans-serif] text-gray-800 overflow-x-hidden">
      <div className="flex flex-col items-center text-center">
        <motion.div
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-8"
        >
          <FailureCrossIcon />
        </motion.div>

        <motion.h1
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-3xl sm:text-4xl font-bold text-amber-800 mb-4"
        >
          payment failed
        </motion.h1>

        <motion.p
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-lg text-gray-600 mb-12"
        >
          Tel: 000-000-0000
        </motion.p>

        <motion.div
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            type="button"
            onClick={() => navigate("/room")}
            className="px-10 py-3 bg-white text-amber-800 font-semibold rounded-lg shadow-md border border-amber-800 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50"
          >
            main menu
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/payment", {
                state: {
                  total,
                  from: "failed",
                  paymentId, // ✅ pass paymentId for re-upload
                },
              })
            }
            className="px-10 py-3 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50 !text-white hover:!text-white focus:!text-white"
          >
            re-upload
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentFailed;
