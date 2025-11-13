import React from "react";
import { motion } from "framer-motion";

const startUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.3 },
    }),
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const CartItem = ({ item, onSelect, isSelected, onDelete }) => {
    return (
        <motion.div
            layout
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={1} // You can pass a custom index 'i' from the map function if needed
            className="flex items-center w-full bg-[var(--cream-color)] border border-[var(--brown-color)] rounded-2xl p-6 md:p-8 mb-4 "
            data-testid="cart-card"
        >
            {/* Checkbox */}
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(item.uniqueId)} // Pass the uniqueId up
                className="h-6 w-6 rounded border-gray-300 accent-[var(--brown-color)] !focus:ring-[var(--light-brown-color)] mr-6 md:mr-8 flex-shrink-0"            
            />
            {/* Image */}
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mr-6 md:mr-8">
                {item.picture.includes('http') ? (
                    <img src={item.picture} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                    'image'
                )}
            </div>
            
            {/* Item Details (from schema) */}
            <div className="flex-grow">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-base mt-1">For: {item.petName}</p>
                <p className="text-sm mt-1">{item.details}</p>
            </div>
            
            {/* Price & Delete Button */}
            <div className="flex flex-col items-end ml-4 flex-shrink-0">
                {item.type === 'room' && item.nights > 0 && (
                    <p className="text-sm text-gray-600 mb-1">
                        {item.nights} night{item.nights !== 1 ? 's' : ''} × {item.pricePerNight} ฿
                    </p>
                )}
                
                <span className="text-xl font-bold mb-2">{item.price.toFixed(2)} THB</span>

                <button
                    onClick={() => onDelete(item.uniqueId)} // Pass id and type up
                    className="bg-[var(--brown-color)] !text-[var(--cream-color)] px-6 py-2.5 rounded-md font-semibold text-base capitalize hover:bg-yellow-800 transition-colors"
                >
                    delete
                </button>
            </div>
        </motion.div>
    );
};

export default CartItem;