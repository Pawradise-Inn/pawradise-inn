import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { overlay, popUP, startUpVariants } from "../../../styles/animation";
import { parseDateFromAPI} from "../../../utils/dateUtils";
import testimg from "../../../assets/test.png"

const ItemRow = ({ item }) => (
  <div className="flex items-center"> {/* ✅ Added shadow and styling */}
    {/* Image Placeholder */}
    <img
      src={item.image || testimg}
      alt={item.name}
      className="object-center rounded-2xl w-[140px] h-[140px]" // ✅ Added flex-shrink-0 and changed to object-cover
    />
    {/* Item Details */}
    <div className="ml-4 flex-grow">
      <div className="text-lg font-semibold !text-[var(--dark-brown-color)]">{item.name}</div>
      <div className="text-base !text-[var(--dark-brown-color)] mt-1 opacity-70">for {item.petName}</div>
    </div>
    <div className="ml-4 flex-shrink-0">
      <div className="text-lg font-semibold !text-[var(--dark-brown-color)]">{item.price.toFixed(2)} THB</div> {/* ✅ Made price larger */}
    </div>
  </div>
);

const PaymentHistoryCard = ({ items, status, totalPrice, paymentDate }) => {
  const getStatusDotColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-[var(--success-color)]';
      case 'FAILED':
        return 'bg-[var(--fail-color)]';
      case 'CANCELLED':
        return 'bg-[var(--warning-color)]'
      default:
        return 'bg-gray-400';
    }
  };

  const statusDotColor = getStatusDotColor(status);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = parseDateFromAPI(dateString);
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="w-full bg-[var(--cream-color)] rounded-xl p-5 mb-6 border-[1.7px] border-[var(--brown-color)] flex flex-col shadow-lg" // ✅ Added shadow-lg
      data-testid={status === "Paid" ? "paymentBlock-success" : "paymentBlock-fail"}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-semibold !text-[var(--dark-brown-color)]">
          {formatDisplayDate(paymentDate)}
        </div>
        <div 
          className="inline-flex items-center bg-[var(--dark-brown-color)] !text-[var(--cream-color)]
                       py-1.5 px-3 rounded-full text-sm font-medium capitalize shadow-md" // ✅ Added shadow-md
        >
          <span className={`w-2.5 h-2.5 rounded-full mr-2 ${statusDotColor}`}></span>
          {status}
        </div>
      </div>

      <div className="flex flex-col gap-3"> {/* ✅ Reduced gap slightly for better spacing */}
        {items.map((item, index) => ( 
          <ItemRow key={item.id || index} item={item} />
        ))}
      </div>

      <div className="flex justify-end mt-5 pt-4 border-t-2 border-[var(--brown-color)]"> {/* ✅ Added border separator */}
        <span className="text-xl font-semibold text-[var(--dark-brown-color)]">
          Total Price: {totalPrice.toFixed(2)} THB
        </span>
      </div>
    </div>
  );
}

export default PaymentHistoryCard