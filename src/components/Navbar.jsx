import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <NavLink to="/">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <span className="font-semibold text-lg text-gray-800">
            Pawradise Inn.
            </span>
        </NavLink>
        
      </div>

      {/* Nav Links */}
      <div className="flex space-x-6">
        {["room", "service", "review", "profile"].map((link) => (
          <NavLink
            key={link}
            to={`/${link}`}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium transition text-gray-700 hover:text-gray-900 ${
                isActive ? "bg-[#d2bba0] text-white" : ""
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
