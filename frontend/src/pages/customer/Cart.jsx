import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; 
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'; // ✅ Added import
import { getCart, toggleCartRoomSelection, toggleCartServiceSelection, deleteCartRoom, deleteCartService } from '../../hooks/cartAPI';

import CartItem from '../../components/Cart/CartItem';

const startUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.3 },
    }),
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0.00);
    const navigate = useNavigate(); // ✅ Added navigation hook

    const fetchCartData = useCallback(async () => {
        try {
            const response = await getCart();
            setCart(response.data);
        } catch(err) {
            console.error("Failed to fetch cart:", err);
        }
    }, []);

    useEffect(() => {
        fetchCartData();
    }, [fetchCartData]);

    useEffect(() => {
        if (!cart) {
            setCartItems([]);
            setSelectedItems([]);
            return;
        }

        const transformedServices = (cart.cartServices || []).map(cs => {
            const scheduledDate = cs.scheduled ? new Date(cs.scheduled) : null;            
            return {
                id: cs.id,
                uniqueId: `service-${cs.id}`, 
                type: 'service',
                name: cs.service?.name || 'Service Not Found', 
                picture: cs.service?.picture || '', 
                petName: cs.pet?.name || 'No Pet Assigned', 
                details: scheduledDate && !isNaN(scheduledDate)
                    ? format(scheduledDate, 'MMM dd, yyyy / h:mm a')
                    : 'Date TBD',
                price: cs.service?.price || 0.00,
                selected: cs.selected,
            };
        });

        const transformedRooms = (cart.cartRooms || []).map(cr => {
            const checkInDate = cr.checkIn ? new Date(cr.checkIn) : null;
            const checkOutDate = cr.checkOut ? new Date(cr.checkOut) : null;
            
            const details = checkInDate && !isNaN(checkInDate) && checkOutDate && !isNaN(checkOutDate)
                ? `${format(checkInDate, 'MMM dd, yyyy')} - ${format(checkOutDate, 'MMM dd, yyyy')}`
                : 'Invalid Dates';

            return {
                id: cr.id,
                uniqueId: `room-${cr.id}`, 
                type: 'room',
                name: cr.room?.name || 'Room Not Found',
                picture: cr.room?.picture || '',
                petName: cr.pet?.name || 'No Pet Assigned',
                details: details,
                price: cr.room?.price || 0.00, 
                selected: cr.selected,
            };
        });

        const allItems = [...transformedServices, ...transformedRooms];
        setCartItems(allItems);

        const initiallySelected = allItems
            .filter(item => item.selected === true)
            .map(item => item.uniqueId);

        setSelectedItems(initiallySelected);

    }, [cart]);

    useEffect(() => {
        const newTotal = cartItems
            .filter(item => selectedItems.includes(item.uniqueId))
            .reduce((sum, item) => sum + item.price, 0);
        setTotal(newTotal);
    }, [selectedItems, cartItems]);

    const handleSelectItem = (uniqueId) => {
        const item = cartItems.find(i => i.uniqueId === uniqueId);
        if (!item) return;

        const newSelectedState = !selectedItems.includes(uniqueId);

        setSelectedItems(prev =>
            newSelectedState
                ? [...prev, uniqueId]
                : prev.filter(id => id !== uniqueId)
        );

        try {
            if (item.type === 'room') {
                toggleCartRoomSelection(item.id, newSelectedState);
            } else if (item.type === 'service') {
                toggleCartServiceSelection(item.id, newSelectedState);
            }
        } catch(err) {
            console.error("Failed to update selection in database:", err);
        }
    };

    const handleSelectAll = (e) => {
        const newSelectedState = e.target.checked;

        setSelectedItems(newSelectedState ? cartItems.map(item => item.uniqueId) : []);

        try {
            const updatePromises = cartItems.map(item => {
                if (item.type === 'room') {
                    return toggleCartRoomSelection(item.id, newSelectedState);
                } else {
                    return toggleCartServiceSelection(item.id, newSelectedState);
                }
            });
            Promise.all(updatePromises);
        } catch(err) {
            console.error("Failed to update all selections:", err);
        }
    };

    const handleDeleteItem = async (id) => {
        const item = cartItems.find(i => i.uniqueId === id);
        if (!item) return;

        try {
            if (item.type === 'room') {
                await deleteCartRoom(item.id);
            } else if (item.type === 'service') {
                await deleteCartService(item.id);   
            }
            fetchCartData();
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
                            data-testid="check-all"
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
                        <button
                            onClick={() => navigate('/payment')} // Added navigation
                            className="bg-[var(--brown-color)] !text-[var(--cream-color)] px-8 py-3 rounded-lg font-bold capitalize hover:bg-yellow-800 transition-colors text-lg"
                        >
                            payment
                        </button>
                    </div>
                </div>
            </div>

            <div className="h-32"></div>
        </div>
    )
}

export default Cart;
