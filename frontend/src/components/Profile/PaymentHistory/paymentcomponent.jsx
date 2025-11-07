import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { overlay, popUP, startUpVariants } from "../../../styles/animation";
import testimg from "../../../assets/test.png"

const ItemRow = ({ item }) => (
  <div className="flex items-center">
    {/* Image Placeholder */}
    <img
      src={item.image || testimg} // ✅ Use item.image from API, fallback to testimg
      alt={item.name}
      className="object-center rounded-2xl w-[140px] h-[140px]"
    />
    {/* Item Details */}
    <div className="ml-4 flex-grow">
      <div className="text-lg font-semibold !text-[var(--dark-brown-color)]">{item.name}</div>
      <div className="text-base !text-[var(--dark-brown-color)] mt-1">for {item.petName}</div> {/* ✅ Changed pet_name to petName */}
    </div>
    <div>
      <div className="text-base !text-[var(--dark-brown-color)] mt-1 ml-4 flex-shrink-0">${item.price.toFixed(2)}</div>
    </div>
  </div>
);

const PaymentHistoryCard = ({ items, status, totalPrice }) => {
  const getStatusDotColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-[var(--success-color)]'; // Paid
      case 'FAILED':
        return 'bg-[var(--fail-color)]'; // Failed
      default:
        return 'bg-gray-400'; // Default
    }
  };

  const statusDotColor = getStatusDotColor(status);

  return (
    <div 
      className="w-full bg-[var(--cream-color)] rounded-xl p-5 mb-6 border-[1.7px] border-[var(--brown-color)] flex flex-col" 
      data-testid={status === "Paid" ? "paymentBlock-success" : "paymentBlock-fail"}
    >

      <div className="flex justify-end mb-4">
        <div 
          className="inline-flex items-center bg-[var(--dark-brown-color)] !text-[var(--cream-color)]
                     py-1.5 px-3 rounded-full text-sm font-medium capitalize"
        >
          <span className={`w-2.5 h-2.5 rounded-full mr-2 ${statusDotColor}`}></span> {/* ✅ Fixed: removed = sign */}
          {status}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item, index) => ( 
          <ItemRow key={item.id || index} item={item} />
        ))}
      </div>

      <div className="flex justify-end mt-5">
        <span className="text-xl font-semibold text-[var(--dark-brown-color)]">
          Total Price: ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default PaymentHistoryCard