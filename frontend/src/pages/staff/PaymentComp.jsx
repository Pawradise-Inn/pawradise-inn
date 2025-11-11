import { useState, useEffect } from "react";
import PaymentCard from "../../components/staff/PaymentCard";
import { fetchAllPaymentAPI, updatePaymentStatusAPI } from "../../hooks/paymentAPI";
import { motion, AnimatePresence } from "framer-motion";

const PaymentComp = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // ✅ for enlarged image

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true);
        const response = await fetchAllPaymentAPI();
        console.log("Full API response:", response);

        const apiData = response?.data?.data ?? response?.data ?? [];
        if (Array.isArray(apiData) && apiData.length > 0) {
          setPayments(apiData);
        } else {
          setPayments([]);
        }
      } catch (error) {
        console.error("❌ Failed to fetch payments:", error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  // handle status change
  const handleStatusChange = async (paymentId, newStatus) => {
    try {
      await updatePaymentStatusAPI(paymentId, newStatus);
      setPayments((prev) =>
        prev.map((p) =>
          p.paymentId === paymentId ? { ...p, status: newStatus } : p
        )
      );
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };

  const handleCheckboxChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredPayments = payments.filter(
    (payment) =>
      (selectedStatuses.length === 0 ||
        selectedStatuses.includes(payment.status)) &&
      payment.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-8 flex flex-col items-start px-0">
      <b className="text-4xl mb-2 text-[var(--dark-brown-color)]">
        Manage Payment
      </b>
      <hr className="lg:w-290 md:w-175 sm:w-100 border-1 border-[var(--brown-color)] mt-2 mb-1" />

      <div className="flex flex-wrap items-center gap-4 w-full px-4">
        {/* search bar */}
        <div className="flex flex-1 min-w-[200px] max-w-[600px] my-4 border-2 rounded-4xl px-5 py-2 text-xl">
          <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center"></i>
          <input
            className="w-full outline-0 placeholder:opacity-75"
            placeholder="search by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* check box */}
        <div className="flex flex-wrap items-center gap-4 my-4">
          {["SUCCESS", "FAILED", "CANCELLED"].map((status) => (
            <label
              key={status}
              className="relative flex items-center space-x-2 cursor-pointer font-semibold"
            >
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status)}
                onChange={() => handleCheckboxChange(status)}
                className="hidden peer"
              />
              <div
                className="relative w-8 h-8 border-2 border-[var(--brown-color)] rounded transition-all bg-[var(--cream-color)]
                  before:absolute before:top-1/2 before:left-1/2 before:w-6 before:h-0.5 before:bg-[var(--dark-brown-color)]
                  before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform
                  before:transition-all before:scale-0 peer-checked:before:scale-100"
              ></div>
              <span>{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* PaymentCard */}
      <div className="w-full ml-0">
        {filteredPayments.length === 0 ? (
          <div className="w-full text-center py-10 text-xl text-[var(--dark-brown-color)]">
            No matching results
          </div>
        ) : (
          <AnimatePresence>
            {filteredPayments.map((payment) => (
              <PaymentCard
                key={payment.paymentId}
                picture={payment.slip}
                username={payment.username}
                bookingDetails={payment.bookingDetail}
                totalPrice={payment.totalPrice}
                status={payment.status}
                onStatusChange={(newStatus) =>
                  handleStatusChange(payment.paymentId, newStatus)
                }
                onPictureClick={() => setPreviewImage(payment.slip)} // ✅ added
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* ✅ Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)} // close when clicking background
          >
            <motion.img
              src={previewImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentComp;
