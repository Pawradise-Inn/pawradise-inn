import { useState } from "react";
import { useNotification } from "../context/notification/NotificationProvider";
import { AnimatePresence, motion } from "motion/react";
import { dropDown } from "../styles/animation";

const DropDownList = ({
  startText="",
  options,
  onChange,
  value,
  element,
  arrowColor = "white",
  mainStyle = "",
  focusStyle = "",
  inputSyle = "rounded-xl px-4 py-2 text-2xl outline-0 bg-[var(--light-brown-color)] rounded",
  dropDownStyle = "border-2 border-[var(--brown-color)] bg-[var(--light-brown-color)]  origin-top translate-y-1 top-full left-0",
  activeColor = "var(--cream-color)",
  ...motionProps
}) => {
  const [dropDownStatus, setDropDownStatus] = useState(false);
  const { createNotification } = useNotification();

  const handleDropDown = () => {
    if (options.length === 0) {
      createNotification(
        "fail",
        "You have no pet",
        "Please add you pet first before operate this."
      );
      return;
    }
    setDropDownStatus(!dropDownStatus);
  };

  return (
    <motion.div className={`w-full relative ${mainStyle}`} {...motionProps}>
      <div
        onClick={handleDropDown}
        className={`relative inline-block w-full cursor-pointer ${inputSyle} ${
          dropDownStatus && focusStyle
        }`}
      >
        {value || startText}
        <i
          style={{ color: arrowColor }}
          className={`bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl cursor-pointer pointer-events-none transition-all duration-200 ${
            dropDownStatus && "rotate-180"
          }`}
        ></i>
      </div>

      <AnimatePresence>
        {dropDownStatus && (
          <motion.div
            key="dropDownBlock"
            variants={dropDown}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`flex flex-col absolute w-full z-50 overflow-hidden ${dropDownStyle}`}
          >
            {options.map((option, idx) => (
              <div key={idx}>
                <div
                  onClick={() => {
                    onChange(option.value);
                  }}
                  className="w-full px-4 py-2 text-xl cursor-pointer relative"
                >
                  {option.value === value ? (
                    <motion.div
                      layoutId={element}
                      style={{ backgroundColor: activeColor }}
                      className="w-full px-4 py-2 text-xl cursor-pointer absolute top-0 left-0 pointer-events-none h-full z-20"
                    />
                  ) : null}
                  <span className="z-30 relative">{option.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DropDownList;
