// import PaymentHistoryCard from "./paymentcomponent";
// import { fetchMyPayments } from "../../../hooks/paymentAPI";
// import { useEffect, useState } from "react";
// import { startUpVariants } from "../../../styles/animation";
// import { AnimatePresence, motion } from "motion/react";

// const PaymentHistory = () => {
//   const [payment, setPayment] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [error, setError] = useState(null);

//   const [page, setPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const limit = 10;

//   // Load payments for a given page
//   const loadPaymentHistory = async (pageNum = 1) => {
//     try {
//       if (pageNum === 1) setLoading(true);
//       else setLoadingMore(true);

//       setError(null);

//       const response = await fetchMyPayments(pageNum, limit);
//       console.log("Payment response:", response);

//       if (response.success) {
//         setPayment((prev) =>
//           pageNum === 1 ? response.data : [...prev, ...response.data]
//         );
//         setTotalCount(response.message.details.count || 0);
//       } else {
//         if (pageNum === 1) setPayment([]);
//       }
//     } catch (err) {
//       console.error("Failed to load payment history", err);
//       setError(err.response?.data?.message || "Failed to load payments");
//       if (pageNum === 1) setPayment([]);
//     } finally {
//       if (pageNum === 1) setLoading(false);
//       else setLoadingMore(false);
//     }
//   };

//   // Initial load and load when page changes
//   useEffect(() => {
//     loadPaymentHistory(page);
//   }, [page]);

//   // Infinite scroll using window scrollbar
//   useEffect(() => {
//     const handleScroll = () => {
//       if (loading || loadingMore) return;

//       const scrollTop = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const fullHeight = document.documentElement.scrollHeight;

//       const totalPages = Math.ceil(totalCount / limit);

//       // Trigger next page load when near bottom
//       if (scrollTop + windowHeight >= fullHeight - 50 && page < totalPages) {
//         setPage((prev) => prev + 1);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [page, loading, loadingMore, totalCount]);

//   return (
//     <div className="p-10">
//       <AnimatePresence mode="wait">
//         {loading ? (
//           <motion.p
//             key="loading"
//             variants={startUpVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="text-2xl w-full text-center min-h-[220px] italic flex justify-center items-center"
//           >
//             Loading Payment History...
//           </motion.p>
//         ) : payment.length === 0 ? (
//           <motion.p
//             key="no-payment"
//             variants={startUpVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="text-2xl w-full text-center min-h-[220px] italic flex justify-center items-center"
//           >
//             No payment history found
//           </motion.p>
//         ) : (
//           <motion.div
//             key="payment-list"
//             variants={startUpVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <motion.h1
//               variants={startUpVariants}
//               initial="hidden"
//               animate="visible"
//               custom={1}
//               className="text-3xl font-bold mb-8"
//             >
//               Payment History
//             </motion.h1>

//             <div className="space-y-6">
//               {payment.map((paymentRecord, idx) => (
//                 <motion.div
//                   key={paymentRecord.paymentId}
//                   variants={startUpVariants}
//                   initial="hidden"
//                   animate="visible"
//                   custom={idx / 3 + 2}
//                 >
//                   <PaymentHistoryCard
//                     items={paymentRecord.items}
//                     status={paymentRecord.paymentStatus}
//                     totalPrice={paymentRecord.totalPrice}
//                   />
//                 </motion.div>
//               ))}

//               {loadingMore && (
//                 <p className="text-center py-4 italic text-gray-500">
//                   Loading more...
//                 </p>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default PaymentHistory;

import PaymentHistoryCard from "./paymentcomponent";
import { fetchMyPayments } from "../../../hooks/paymentAPI";
import { useEffect, useState } from "react";
import { startUpVariants } from "../../../styles/animation";
import { AnimatePresence, motion } from "motion/react";
import Pagination from "../../Pagination";

const PaymentHistory = () => {
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 5;

  const loadPaymentHistory = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetchMyPayments(page, limit);
      console.log("this is the response" ,response.data)
      if (response.success) {
        setPayment(response.data || []);
        // totalCount is inside message.details.count
        setTotalCount(response.message.details?.count || 0);
      } else {
        setPayment([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load payments");
      setPayment([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaymentHistory(currentPage);
  }, [currentPage]);

  return (
    <div className="p-10">
      <AnimatePresence mode="wait">
        {loading ? (
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
        ) : payment.length === 0 ? (
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
                    paymentDate={paymentRecord.paymentDate}
                  />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              id="payment-pagination"
              pageAmount={totalCount}      // total items
              currentPage={currentPage}    // current page
              onClick={(p) => {
                setCurrentPage(p)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              commentPerPage={limit}       // items per page
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentHistory;

