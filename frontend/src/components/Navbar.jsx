import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { startUpVariants } from "../styles/animation";

const Navbar = ({
  pages,
  pathIdxHighlight,
  prevPath,
  paths,
  counts,
  element,
  mainStyle = "bg-white shadow-md px-10 py-4 flex items-center justify-between",
  activeColor = "var(--light-brown-color)",
  topNavBar = false,
}) => {
  const location = useLocation();
  const [path, setPath] = useState(
    location.pathname.split("/")[pathIdxHighlight]
  );

  // Update page state when location changes
  useEffect(() => {
    const currentPage = location.pathname.split("/")[pathIdxHighlight];
    setPath(currentPage);
  }, [location.pathname, pathIdxHighlight]);

  return (
    <nav className={`${mainStyle}`}>
      {/* Logo */}
      {topNavBar && (
        <div className="flex items-center space-x-3">
          <NavLink to="/room" className="flex items-center">
            <img src={Logo} alt="logo" className="h-10 w-auto" />
            <span className="font-semibold text-lg text-gray-800 ml-2">
              Pawradise Inn.
            </span>
          </NavLink>
        </div>
      )}

      {/* Nav Links */}
      <div className="flex gap-x-6 z-0">
        {pages.map((link, idx) => (
          <NavLink
            key={link}
            to={`${prevPath}/${paths[idx]}/`}
            onClick={() => setPath(paths[idx])}
            className="relative px-7 py-3 font-medium rounded-sm"
            end
          >
            {/* Background highlight */}
            {paths[idx] === path ? (
              <motion.div
                layoutId={element}
                style={{ backgroundColor: activeColor }}
                className="block w-full h-full absolute top-0 left-0 rounded-sm -z-10"
                data-testid="navigatorNavbar"
              />
            ) : null}
            {/* NavLink text */}
            <motion.span
              variants={startUpVariants}
              initial="hidden"
              animate="found"
              className="relative z-10 font-semibold "
            >
            {counts ? (<p className="font-semibold font-style: italic text-center">
                {counts[idx]} {/* Display the count */}
              </p>
            ): null}   
                {link} {/* Display the text */}
            </motion.span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
