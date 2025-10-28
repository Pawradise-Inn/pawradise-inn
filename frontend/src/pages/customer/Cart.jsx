import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; 
import { format } from 'date-fns';

import CartItem from '../../components/Cart/CartItem';

const mockPendingBooking = {
    id: 1,
    status: 'PENDING',
    customerName: 'Test Customer',
    booked_service: [
        {
            id: 1,
            scheduled: '2025-11-10T10:00:00Z',
            service: {
                id: 10,
                name: 'Deluxe Pet Grooming',
                price: 850.00,
                picture: 'https://storage.googleapis.com/paw_image/service_grooming.jpg'
            },
            pet: {
                id: 3,
                name: 'Buddy'
            }
        },
        // Example of an item that would have crashed the old code
        {
            id: 2,
            scheduled: null, // Invalid date
            service: {
                id: 11,
                name: 'Basic Checkup',
                price: 300.00,
                picture: ''
            },
            pet: null // No pet assigned
        }
    ],
    booked_room: [
        {
            id: 1,
            checkIn: '2025-11-05T14:00:00Z',
            checkOut: '2025-11-07T12:00:00Z',
            room: {
                id: 20,
                name: 'Standard Room',
                price: 2400.00,
                picture: 'https://storage.googleapis.com/paw_image/room_standard.jpg'
            },
            pet: {
                id: 4,
                name: 'Luna'
            }
        }
    ]
};

const fetchPendingBookingAPI = async () => {
    console.log("API: Fetching pending booking...");
    return new Promise(resolve => setTimeout(() => resolve(mockPendingBooking), 500));
};

const deleteBookedServiceAPI = async (id) => {
    console.log(`API: Deleting BookedService with id: ${id}`);
    return new Promise(resolve => setTimeout(resolve, 300));
};

const deleteBookedRoomAPI = async (id) => {
    console.log(`API: Deleting BookedRoom with id: ${id}`);
    return new Promise(resolve => setTimeout(resolve, 300));
};

// --- Animation Variants ---
const startUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.3 },
    }),
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const Cart = () => {
    const [booking, setBooking] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0.00);

    const fetchBookingData = useCallback(async () => {
        const data = await fetchPendingBookingAPI();
        setBooking(data);
    }, []);

    useEffect(() => {
        fetchBookingData();
    }, [fetchBookingData]);

    useEffect(() => {
        if (!booking) {
            setCartItems([]);
            return;
        }

        const transformedServices = booking.booked_service.map(bs => {
            // FIX: Check for valid date string before formatting
            const scheduledDate = bs.scheduled ? new Date(bs.scheduled) : null;            
            
            return {
                id: bs.id,
                // FIX: Typo 'uniqeId' -> 'uniqueId'
                uniqueId: `service-${bs.id}`, 
                type: 'service',
                // FIX: Add optional chaining '?. ' to prevent crashes on null data
                name: bs.service?.name || 'Service Not Found', 
                picture: bs.service?.picture || '', 
                petName: bs.pet?.name || 'No Pet Assigned', 
                // FIX: Validate date object before formatting
                details: scheduledDate && !isNaN(scheduledDate)
                    ? format(scheduledDate, 'MMM dd, yyyy / h:mm a')
                    : 'Date TBD',
                price: bs.service?.price || 0.00,
            };
        });

        const transformedRooms = booking.booked_room.map(br => {
            const checkInDate = br.checkIn ? new Date(br.checkIn) : null;
            const checkOutDate = br.checkOut ? new Date(br.checkOut) : null;
            
            const details = checkInDate && !isNaN(checkInDate) && checkOutDate && !isNaN(checkOutDate)
                ? `${format(checkInDate, 'MMM dd, yyyy')} - ${format(checkOutDate, 'MMM dd, yyyy')}`
                : 'Invalid Dates';

            return {
                id: br.id,
                // FIX: Typo 'uniqeId' -> 'uniqueId'
                uniqueId: `room-${br.id}`, 
                type: 'room',
                // FIX: Add optional chaining '?. '
                name: br.room?.name || 'Room Not Found',
                picture: br.room?.picture || '',
                petName: br.pet?.name || 'No Pet Assigned',
                details: details,
                // FIX: Critical bug! Was 'br.room.picture', now 'br.room.price'
                price: br.room?.price || 0.00, 
            };
        });
        setCartItems([...transformedServices, ...transformedRooms]);
    }, [booking]);

    useEffect(() => {
        const newTotal = cartItems
            .filter(item => selectedItems.includes(item.uniqueId))
            .reduce((sum, item) => sum + item.price, 0);
        setTotal(newTotal);
    }, [selectedItems, cartItems]);

    const handleSelectItem = (uniqueId) => {
        setSelectedItems(prev => 
            prev.includes(uniqueId)
                ? prev.filter(id => id !== uniqueId)
                : [...prev, uniqueId]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(cartItems.map(item => item.uniqueId));
        } else {
            setSelectedItems([]);
        }
    };

    const handleDeleteItem = async (id, type) => {
        try {
            if (type === 'service') {
                await deleteBookedServiceAPI(id);
            } else if (type === 'room') {
                await deleteBookedRoomAPI(id);
            }
            fetchBookingData();
        } catch(err) {
            console.error("Failed to delete item:", err);
        }
    }

    const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

    return (
        <div className="w-full max-w-6xl mx-auto pt-10 px-4 md:px-0">
            {/* Page Title */}
            <motion.h1
                variants={startUpVariants}
                initial="hidden"
                animate="visible"
                custom={0}
                className="text-5xl font-bold mb-8"
            >
                <i className="bi bi-bag text-5xl text-[var(--dark-brown-color)] mr-4"></i>
                My Cart
            </motion.h1>

            {/* Cart Items List */}
            <div className="cart-list-container relative">
                    <AnimatePresence mode="popLayout">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <CartItem
                                    key={item.uniqueId}
                                    item={item}
                                    isSelected={selectedItems.includes(item.uniqueId)}
                                    onSelect={handleSelectItem}
                                    onDelete={handleDeleteItem}
                                />
                            ))
                        ) : (
                            <motion.p
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                Your cart is empty.
                            </motion.p>
                        )}
                    </AnimatePresence>
            </div>

            {/* Fixed Footer */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                <div className="w-full max-w-6xl mx-auto flex justify-between items-center py-5 px-4 md:px-0">
                    {/* Select All */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="select-all"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            className="h-6 w-6 rounded border-gray-300 accent-[var(--brown-color)] !focus:ring-[var(--light-brown-color)] mr-3 flex-shrink-0"
                        />
                        <label
                            htmlFor="select-all"
                            className="text-2xl font-bold cursor-pointer"
                        >
                            All
                        </label>
                    </div>
                    
                    {/* Total & Payment Button */}
                    <div className="flex items-center">
                        <div className="text-lg mr-6">
                            Total
                            <span className="font-bold text-xl ml-2">
                                {total.toFixed(2)} THB
                            </span>
                        </div>
                        <button className="bg-[var(--brown-color)] !text-[var(--cream-color)] px-8 py-3 rounded-lg font-bold capitalize hover:bg-yellow-800 transition-colors text-lg">
                            payment
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom padding */}
            <div className="h-32"></div>
        </div>
    )
}

export default Cart;