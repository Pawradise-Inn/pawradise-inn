import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { notification } from "../../styles/animation";
import NotificationCard from "./NotificationCard";

const NotificationContext = createContext([]);

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  //  @parameter 
  //  status: "success", "warning", "fail"
  //  header: header text
  //  text: body text
  //  onClick: function want to pass for warning notification when user agree

  const createNotification = (status, header, text, onClick, duration = 5000) => {
    const id = Date.now();
    if (status === "warning") {
      setNotifications((prev) => [...prev, { id, header, text, onClick, status }]);
    } else {
      const timeoutId = setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
      setNotifications((prev) => [
        ...prev,
        { id, header, text, status, timeoutId },
      ]);
    }
  };

  const removeNotification = (id) => {
    setNotifications((prev) => {
      const notif = prev.find((n) => n.id === id);
      if (notif && notif.timeoutId) clearTimeout(notif.timeoutId);
      return prev.filter((n) => n.id !== id);
    });
  };

  return (
    <NotificationContext.Provider value={{createNotification}}>
      {children}
      <div
        style={{ zIndex: 1000 }}
        className="fixed w-[400px] bottom-1 right-1  h-full pointer-events-none flex flex-col justify-end gap-1 overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          {notifications.map((notif) => {
            return (
              <div key={notif.id} className="pointer-events-auto">
                <NotificationCard
                  notification={notif}
                  layoutRoot 
                  variants={notification}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={notif.onClick}
                  removeNotification={removeNotification}
                />
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  return useContext(NotificationContext);
};

export { NotificationProvider, useNotification };
