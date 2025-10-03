import { motion } from "motion/react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState } from "react";
import { startUpVariants } from "../styles/animation";

const Navbar = () => {
  const location = useLocation();
  const pages = ["room", "service", "review", "profile"];
  const [page, setPage] = useState(location.pathname.split("/")[1]);

  return (
    <nav className="bg-white shadow-md px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <NavLink to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="h-10 w-auto" />
          <span className="font-semibold text-lg text-gray-800 ml-2">
            Pawradise Inn.
          </span>
        </NavLink>
      </div>

      {/* Nav Links */}
      <div className="flex gap-x-6 z-0">
        {pages.map((link) => (
          <NavLink
            key={link}
            to={`/${link}`}
            onClick={() => setPage(link)}
            className="relative px-7 py-3 font-medium rounded-sm"
            end
          >
            {/* Background highlight */}
            {link === page ? (
              <motion.div
                layoutId="hover"
                className="block w-full h-full absolute top-0 left-0 bg-[var(--light-brown-color)] rounded-sm -z-10"
              />
            ) : null}
            {/* NavLink text */}
            <motion.span
              variants={startUpVariants}
                    initial="hidden"
                    animate="found"
              className="relative z-10 font-semibold "
            >
              {link}
            </motion.span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
