import { motion } from "motion/react";

const NotificationCard = ({
  notification,
  removeNotification,
  onClick,
  ...motionProps
}) => {
  const getStatusColor = (status) => {
    if (status === "success") {
      return "var(--success-color-alpha)";
    } else if (status === "fail") {
      return "var(--fail-color-alpha)";
    } else if (status === "warning") {
      return "var(--warning-color-alpha)";
    } else {
      return "white";
    }
  };

  const getStutusIcon = (status) => {
    if (status === "success") {
      return (
        <i className="bi bi-check-circle-fill inline-flex justify-center items-center text-xl"></i>
      );
    } else if (status === "fail") {
      return (
        <i className="bi bi-x-circle-fill inline-flex justify-center items-center text-xl"></i>
      );
    } else if (status === "warning") {
      return (
        <i className="bi bi-exclamation-circle-fill inline-flex justify-center items-center text-xl"></i>
      );
    } else {
      return "Something is wrong";
    }
  };

  return (
    <motion.div
      className={
        "rounded-xl border-4 overflow-hidden relative w-full cursor-auto"
      }
      {...motionProps}
    >
      <i
        onClick={() => removeNotification(notification.id)}
        className="bi bi-x-lg flex justify-center items-center absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 cursor-pointer hover:scale-125 transition-all duration-200"
      ></i>
      <section
        style={{
          backgroundColor: getStatusColor(notification.status),
        }}
        className={`${notification.overflow ? "" : "border-b-4"} py-2 px-4 w-full border-b-[var(--dark-brown-color)]`}
      >
        <b className="flex justify-start items-center gap-2 text-xl">
          {getStutusIcon(notification.status)} {notification.header}
        </b>
      </section>
      {notification.overflow ? null : (
        <section className="py-2 px-4 w-full bg-[var(--cream-color)]">
          <b>{notification.text}</b>
          {notification.status === "warning" ? (
            <>
              <hr className="my-3 scale-105" />
              <div className="flex justify-end items-center gap-4">
                <button
                  onClick={() => removeNotification(notification.id)}
                  style={{
                    backgroundColor: getStatusColor(notification.status),
                  }}
                  className="py-1 px-2 rounded border-2 border-[var(--dark-brown-color)] cursor-pointer transition-all duration-200 active:scale-90"
                >
                  Cancle
                </button>
                <button
                  onClick={() => {
                    onClick();
                    removeNotification(notification.id);
                  }}
                  style={{
                    backgroundColor: getStatusColor(notification.status),
                  }}
                  className="py-1 px-2 rounded border-2 border-[var(--dark-brown-color)] cursor-pointer transition-all duration-200 active:scale-90"
                >
                  Confirm
                </button>
              </div>
            </>
          ) : null}
        </section>
      )}
    </motion.div>
  );
};

export default motion.create(NotificationCard);
