import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { dropDown } from "../styles/animation";

const DateDropDown = ({ value, customInput, onChange, onFocus = null }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DatePicker
      isClearable
      disabledKeyboardNavigation
      selected={value}
      onChange={onChange}
      wrapperClassName="w-full"
      onMonthChange={(date) => setCurrentMonth(date.getMonth())}
      dayClassName={(date) =>
        date.getMonth() !== currentMonth ? "opacity-50" : ""
      }
      customInput={customInput}
      open={isOpen}
      onInputClick={() => {
        setIsOpen(!isOpen);
        onFocus?.();
      }}
      onSelect={() => setIsOpen(false)}
      onClickOutside={() => {
        setIsOpen(false);
        setCurrentMonth(new Date().getMonth());
      }}
      calendarContainer={({ className, children }) => (
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.div
              key="calendar"
              variants={dropDown}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`${className} origin-top z-50`}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    />
  );
};

export default DateDropDown;
