import PaymentHistoryCard from "./paymentcomponent"
import { fetchMyPayments } from "../../../hooks/paymentAPI"
import { useEffect, useState,useRef  } from "react";
import { startUpVariants } from "../../../styles/animation";
import { AnimatePresence, motion } from "motion/react";

const PaymentHistory = () => {
  const [payment, setPayment] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const hasFetched = useRef(false)
  useEffect(() => {
    if (hasFetched.current) return;
      hasFetched.current = true;
    const loadPaymentHistory = async () => {
      try {
        setLoading(true)
        setError(null)
        const paymentHistory = await fetchMyPayments()
        console.log(paymentHistory)
        
        if (paymentHistory.success && paymentHistory.data) {
          setPayment(paymentHistory.data)
        } else {
          setPayment([])
        }
      } catch (error) {
        console.error("Failed to load payment history", error)
        setError(error.response?.data?.message || "Failed to load payments")
        setPayment([])
      } finally {
        setLoading(false)
      }
    };
    
    loadPaymentHistory()
  }, [])

  // ✅ Single return with proper conditional rendering
  return (
    <div className="p-10">
      <AnimatePresence mode="wait"> {/* ✅ Changed to "wait" mode */}
        {loading ? (
          // STATE 1: LOADING
          <motion.p
            key="loading"
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-2xl w-full text-center min-h-[220px] italic flex justify-center items-center"
          >
            Loading Payment History...
          </motion.p>
        ): payment.length === 0 ? (
          // STATE 3: EMPTY (NO PAYMENTS)
          <motion.p
            key="no-payment"
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-2xl w-full text-center min-h-[220px] italic flex justify-center items-center"
          >
            No payment history found
          </motion.p>
        ) : (
          // STATE 4: CONTENT (HAS PAYMENTS)
          <motion.div
            key="payment-list"
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.h1
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-3xl font-bold mb-8"
            >
              Payment History
            </motion.h1>
            
            <div className="space-y-6">
              {payment.map((paymentRecord, idx) => (
                <motion.div
                  key={paymentRecord.paymentId}
                  variants={startUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={idx / 3 + 2}
                >
                  <PaymentHistoryCard
                    items={paymentRecord.items}
                    status={paymentRecord.paymentStatus}
                    totalPrice={paymentRecord.totalPrice}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PaymentHistory