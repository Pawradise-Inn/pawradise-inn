import { motion } from "motion/react";
import { startUpVariants } from "../styles/animation";
import { NavLink } from "react-router-dom";

const SideBar = ({ link, currentPage, setCurrentPage }) => {
  
  return (
    <motion.aside className="text-center w-60 p-4 flex flex-col gap-y-16 font-semibold mr-10 mt-10 mb-10 border-r border-gray-300 ">
      {link.map((data, idx) => {
        return (
          <motion.div
            key={`container ${data.text}`}
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={idx / 3}
            className="relative px-4 py-4 rounded"
          >
            {data.text}{" "}
            {data.badge ? (
              <div
                className={` !text-white rounded-full px-2 py-0 bg-[var(--fail-color-alpha)] absolute inline-block z-20 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  data.path === currentPage
                    ? "top-0 right-0 -translate-y-1/2 translate-x-1/2"
                    : "top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2"
                }`}
              >
                {data.badge}
              </div>
            ) : null}
            <NavLink
              key={`link ${data.text}`}
              to={data.to}
              onClick={() => setCurrentPage(data.path)}
              className="absolute w-full h-full z-0 top-0 left-0 text-center flex justify-center items-center"
              end
            >
              {data.path === currentPage ? (
                <>
                  <motion.div
                    layoutId={`myProfileSelecting${link[0].text}`}
                    className="block w-full h-full absolute top-0 left-0 bg-[var(--dark-brown-color)] rounded -z-10"
                  />
                  <motion.span
                    variants={startUpVariants}
                    initial="hidden"
                    animate="found"
                    className="!text-[var(--cream-color)] z-10"
                  >
                    {data.text}
                  </motion.span>
                </>
              ) : null}
            </NavLink>
          </motion.div>
        );
      })}
      {/* Logout Button */}
      <motion.div className="relative px-4 py-4 rounded mt-auto shadow-md">
        <NavLink
          to="/login" // Redirect to login
          onClick={() => setCurrentPage('/login')} // Set current page to login
          className="block w-full text-center text-red-600"
        >
          Logout
        </NavLink>
      </motion.div>
    </motion.aside>
  );
};

export default SideBar;
