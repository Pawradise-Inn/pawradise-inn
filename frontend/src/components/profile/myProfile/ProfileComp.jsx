import { motion } from "motion/react";
import {  useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { updateCustomerAPI } from "../../../hooks/customerAPI";
import { startUpVariants } from "../../../styles/animation";
import { useNotification } from "../../../context/notification/NotificationProvider";
import { deleteMeAPI } from "../../../hooks/authAPI";

const ProfileComp = () => {
  const { createNotification } = useNotification();
  const outletCtx = useOutletContext();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const activeBookingCount = outletCtx?.activeBookingCount;

  const [newUser, setNewUser] = useState({
    id: undefined,
    firstname: "",
    lastname: "",
    user_name: "",
    phone_number: "",
    email: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [submitErr, setSubmitErr] = useState("");

  const fields = [
    {
      label: "Firstname",
      name: "firstname",
      type: "text",
      autoComplete: "true",
    },
    { label: "Lastname", name: "lastname", type: "text", autoComplete: "true" },
    {
      label: "Username",
      name: "user_name",
      type: "text",
      autoComplete: "true",
    },
    {
      label: "Phone Number",
      name: "phone_number",
      type: "tel",
      autoComplete: "true",
    },
    { label: "Email", name: "email", type: "email", autoComplete: "true" },
  ];

  useEffect(() => {
    if (user) {
      setNewUser({ id: user.id, ...user });
    }
  }, [user]);

  const handleCancel = () => {
    createNotification("warning", "Are you sure to cancel your change?", "Your modified infomation will be discarded.", () => {
      if(user) setNewUser({id: user.id, ... user})
    })
  };
  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!newUser.id) return;
    createNotification(
      "warning",
      "Confirmation.",
      "Are you sure to update the data?",
      () => {
        try {
          const { id, ...userObjected } = newUser;
          updateCustomerAPI(user.customer.id, userObjected).then((data) => {
          console.log("data:",data)
          setUser?.(data); 
          createNotification(
            "success",
            "Profile updated successfully!",
            "Your update has been saved."
          );
          })
          .catch((err) => {
            console.error("Update failed:", err);
          });
} catch (err) {
 console.error(err);
 }
}
 );
  };
  const openDeleteModal = () => {
    setPassword("");
    setSubmitErr("");
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!password) {
      setSubmitErr("Please enter your password.");
      return;
    }

    setShowDeleteModal(false);
    setUser?.(null);
    deleteMeAPI().then((data) => {
      console.log(data)
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      createNotification(
        "success",
        "Account deletion confirmed",
        "Your account would be deleted. Any active bookings (if any) would be automatically declined."
      );
      navigate("/login", { replace: true })
    })
    .catch((err) => {
      createNotification("fail", "Delete failed", "Failed to delete.");
    });


  };

  return (
    <div>
      <div className="mb-8">
        <motion.h1
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-3xl font-bold"
        >
          My Profile
        </motion.h1>
      </div>

      <form onSubmit={handleConfirm}>
        <motion.div
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="max-w-2xk bg-white rounded shadow-lg p-8"
        >
          <div className="space-y-6">
            {fields.map((data, idx) => (
              <motion.div
                variants={startUpVariants}
                initial="hidden"
                animate="visible"
                custom={idx / 3 + 2}
                key={data.name}
              >
                <label className="block text-sm font-semibold mb-2">
                  {data.label}
                </label>
                <input
                  type={data.type}
                  value={newUser[data.name] || ""}
                  autoComplete={data.autoComplete}
                  onChange={(e) =>
                    setNewUser({ ...newUser, [data.name]: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 
                  border-[var(--brown-color)] bg-[var(--cream-color)] 
                  focus:border-[var(--dark-brown-color)] focus:outline-none"
                />
              </motion.div>
            ))}
          </div>

          {/* actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--brown-color)]">
            <button
              type="button"
              onClick={openDeleteModal}
              className="px-6 py-2 font-bold bg-white rounded shadow 
                         transition-all duration-300 !text-red-600 hover:bg-red-400 hover:!text-white"
            >
              Delete account
            </button>

            <div className="flex space-x-8">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 rounded hover:bg-[var(--light-brown-color)] hover:scale-90 transition-all duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="!text-white px-6 py-2 bg-[var(--dark-brown-color)] rounded hover:scale-90 transition-all duration-300 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </form>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative z-10 w-[min(680px,90vw)] rounded-2xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute right-4 top-3 text-2xl leading-none hover:opacity-70"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-center text-3xl font-extrabold mb-6">
              Are you sure ?
            </h2>

            <div className="px-2">
              <h3 className="text-lg font-semibold mb-2">Delete account</h3>

              <p className="text-[var(--brown-color)]/80 mb-4">
                Deleting your account is permanent.&nbsp;
                <span className="font-semibold">
                  {typeof activeBookingCount === "number"
                    ? `You currently have ${activeBookingCount} active booking${
                        activeBookingCount > 1 ? "s" : ""
                      }; they will be automatically declined.`
                    : "Any active bookings (if any) will be automatically declined."}
                </span>
              </p>

              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none"
                />
                {submitErr && (
                  <p className="text-[var(--fail-color)] text-sm">
                    {submitErr}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  onClick={confirmDelete}
                  className="px-8 py-2 rounded-lg !text-white bg-[var(--dark-brown-color)] hover:opacity-90 transition"
                >
                  confirm
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-8 py-2 rounded-lg text-[var(--dark-brown-color)] bg-[var(--light-brown-color)] hover:opacity-90 transition"
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComp;
