import { motion, AnimatePresence } from "motion/react";
import { NavLink } from "react-router-dom";
import { getCart } from "../../hooks/cartAPI";
import { useEffect, useState } from "react";

const CartButton = ({ to }) => {
  const MotionNavLink = motion(NavLink);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const fetchCartCount = async () => {
    try {
      const totalCart = await getCart();
      const count = (totalCart?.data?.cartRooms?.length || 0) + (totalCart?.data?.cartServices?.length || 0);
      console.log("🟡 Cart count:", count);
      setCount(count);
    } catch (err) {
      setCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();

    const handleCartUpdate = () => {
      console.log("🔄 Cart updated, refreshing count...");
      fetchCartCount();
    };
    const handleHideCart = () => setIsVisible(false);
    const handleShowCart = () => setIsVisible(true);

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("hideCartButton", handleHideCart);
    window.addEventListener("showCartButton", handleShowCart);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("hideCartButton", handleHideCart);
      window.removeEventListener("showCartButton", handleShowCart);
    };
  }, []);
  return (
    <AnimatePresence>
    {isVisible && (
      <MotionNavLink
      to={to}
      className="w-[55px] h-[55px] rounded-full bg-[var(--brown-color)] border-none  flex justify-center items-center cursor-pointer "
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      data-testid="cart-icon"
    >
    <i className="bi bi-bag !text-[var(--cream-color)] text-2xl"></i>
    {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="absolute top-0 right-0 w-5 h-5 bg-[var(--fail-color-alpha)] !text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white"
        >
          {count > 9 ? "9+" : count}
        </motion.span>
      )}
    </MotionNavLink>
  )}
  </AnimatePresence>
  );
};

export default CartButton;