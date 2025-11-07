import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";


const CartButton = ({ to }) => {
  const MotionNavLink = motion(NavLink);

  return (
    <MotionNavLink
      to={to}
      className="w-[55px] h-[55px] rounded-full bg-[var(--brown-color)] border-none  flex justify-center items-center cursor-pointer "
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      data-testid="cart-icon"
    >
    <i className="bi bi-bag !text-[var(--cream-color)] text-2xl"></i>
    </MotionNavLink>
  );
};

export default CartButton;