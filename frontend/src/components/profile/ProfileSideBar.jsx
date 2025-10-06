import { motion } from "motion/react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { startUpVariants } from "../../styles/animation";

const ProfileSideBar = () => {
  const location = useLocation();
  const pathList = location.pathname.split("/");
  const link = [
    { text: "My Profile", to: "/profile", path: "me" },
    { text: "My Booking", to: "/profile/booking", path: "booking" },
    { text: "My Pet", to: "/profile/pet", path: "pet" },
  ];
  const [page, setPage] = useState(pathList[2] ? pathList[2] : "me");

  return (
    <div className="text-center w-60 p-4 flex flex-col gap-y-16 font-semibold mr-10 mt-10 mb-10 border-r border-gray-300 ">
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
            {data.text}
            <NavLink
              key={`link ${data.text}`}
              to={data.to}
              onClick={() => setPage(data.path)}
              className="absolute w-full h-full z-0 top-0 left-0 text-center flex justify-center items-center"
              end
            >
              {data.path === page ? (
                <>
                  <motion.div
                    layoutId="myProfileSelecting"
                    className="block w-full h-full absolute top-0 left-0 bg-[var(--dark-brown-color)] rounded -z-10"
                  />
                  <motion.span
                    variants={startUpVariants}
                    initial="hidden"
                    animate="found"
                    className="!text-[var(--cream-color)] relative z-10"
                  >
                    {data.text}
                  </motion.span>
                </>
              ) : null}
            </NavLink>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProfileSideBar;
