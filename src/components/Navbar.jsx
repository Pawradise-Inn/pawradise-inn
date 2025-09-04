import { NavLink } from "react-router-dom";

const Navbar = () => {
    const pages = ["room", "service", "review", "profile"];
  return (
    <nav className="bg-white shadow-md px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <NavLink to="/" className="flex items-center">
          <img src="../src/assets/logo.png" alt="logo" className="h-10 w-auto" />
          <span className="font-semibold text-lg text-gray-800 ml-2">
            Pawradise Inn.
          </span>
        </NavLink>
      </div>

      {/* Nav Links */}
      <div className="flex space-x-6">
        {pages.map((link) => (
          <NavLink
            key={link}
            to={`/${link}`}
            className={({ isActive }) =>
              `px-7 py-3 rounded-sm font-medium transition font-semibold transition-all duration-300 ease-in-out ${
                isActive ? "bg-[var(--light-brown-color)] !text-[var(--dark-brown-color)]" : ""
              }`
            }
          >
            {link}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
