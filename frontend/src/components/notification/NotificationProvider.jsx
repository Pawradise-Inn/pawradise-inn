import { AnimatePresence } from "motion/react";
import { createContext, useContext, useState } from "react";
import { notification, overlay } from "../../styles/animation";
import Overlay from "../Overlay";
import NotificationCard from "./NotificationCard";

const NotificationContext = createContext([]);

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isBlock, setIsBlock] = useState(false);
  const [useAnimation, setUseAnimation] = useState(false);

  const overflowNumber = 4;

  //  @parameter
  //  status: "success", "warning", "fail"
  //  header: header text
  //  text: body text
  //  onClick: function want to pass for warning notification when user agree
  //                  only neccessary with warning status

  const createNotification = (
    status,
    header,
    text,
    onClick,
    duration = 5000
  ) => {
    const id = Date.now();
    if (status === "warning") {
      setIsBlock(true);
      setNotifications((prev) => [
        ...prev,
        { id, header, text, status, overflow: false, onClick },
      ]);
    } else {
      const timeoutId = setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
      setNotifications((prev) => [
        ...prev,
        { id, header, text, status, overflow: false, timeoutId },
      ]);
    }

    if (notifications.length >= overflowNumber) {
      notifications[notifications.length - overflowNumber].overflow = true;
    }
  };

  const removeNotification = (id) => {
    setNotifications((prev) => {
      const notif = prev.find((n) => n.id === id);
      const notim = notifications[notifications.length - overflowNumber - 1];
      if (notif.status === "warning") setIsBlock(false);
      if (notif && notif.timeoutId) clearTimeout(notif.timeoutId);
      if (
        notifications.length >= overflowNumber &&
        notim &&
        notif.id > notim.id
      )
        notifications[
          notifications.length - overflowNumber - 1
        ].overflow = false;
      return prev.filter((n) => n.id !== id);
    });
  };

  return (
    <NotificationContext.Provider value={{ createNotification }}>
      {children}
      <AnimatePresence>
        {isBlock ? (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={
              isBlock && !useAnimation
                ? () => {
                    setUseAnimation(true);
                    setTimeout(() => {
                      setUseAnimation(false);
                    }, [500]); // animation time
                  }
                : null
            }
            bgColor="white"
            className={"cursor-not-allowed"}
          />
        ) : null}
      </AnimatePresence>
      <div
        style={{ zIndex: 1000 }}
        className={
          "fixed w-[400px] bottom-1 right-1 h-full flex flex-col justify-end gap-1 transition-all duration-200 pointer-events-none"
        }
      >
        <AnimatePresence mode="popLayout">
          {notifications.map((notif) => {
            return (
              <div key={notif.id} className="pointer-events-auto">
                <NotificationCard
                  notification={notif}
                  layout
                  variants={notification}
                  initial={useAnimation ? null : "hidden"}
                  animate={
                    useAnimation && notif.status === "warning"
                      ? "shaking"
                      : "visible"
                  }
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
