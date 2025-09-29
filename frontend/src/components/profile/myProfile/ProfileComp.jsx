import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { updateCustomerAPI } from "../../../hooks/customerAPI";
import { startUpVariants } from "../../../styles/animation";
import { motion } from "motion/react";

const ProfileComp = () => {
  const outletCtx = useOutletContext();
  const user = outletCtx?.user;
  const setUser = outletCtx?.setUser;

  const [newUser, setNewUser] = useState({
    id: undefined,
    firstname: "",
    lastname: "",
    user_name: "",
    phone_number: "",
    email: "",
  });

  const fields = [
    {
      label: "Firstname",
      name: "firstname",
      type: "text",
      autoComplete: "true",
    },
    {
      label: "Lastname",
      name: "lastname",
      type: "text",
      autoComplete: "true",
    },
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
    {
      label: "Email",
      name: "email",
      type: "email",
      autoComplete: "true",
    },
  ];

  useEffect(() => {
    if (user) {
      setNewUser({ id: user.id, ...user.user });
    }
  }, [user]);
  console.log(user);

  const handleCancel = () => {
    const cancel = window.confirm("Are you sure?");
    if (cancel && user) {
      setNewUser({ id: user.id, ...user.user });
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!newUser.id) return;
    const confirmUpdate = window.confirm("Are you sure to update the data?");
    if (!confirmUpdate) return;

    try {
      const { id, ...userObjected } = newUser;
      // const response = await updateCustomerAPI(id, userObjected);
      console.log(newUser);
      // setUser(response.data);
      updateCustomerAPI(id, userObjected).then((data) => {
        setUser({ ...user, user: data.data });
        console.log(data.data);
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile. Please try again.");
    }
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
            {fields.map((data, idx) => {
              return (
                <motion.div
                  variants={startUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={idx / 3 + 2}
                  key={idx}
                >
                  <label className="block text-sm font-semibold mb-2">
                    {data.label}
                  </label>
                  <input
                    type={data.type}
                    value={newUser[`${data.name}`] || ""}
                    autoComplete={data.autoComplete}
                    onChange={(e) =>
                      setNewUser({ ...newUser, firstname: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 
                  border-(--brown-color) bg-(--cream-color) 
                  focus:border-(--dark-brown-color) focus:outline-none"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* actions */}
          <div className="flex justify-end items-center mt-8 pt-6 border-t border-(--brown-color)">
            <div className="flex space-x-8">
              <button
                type="button"
                onClick={() => handleCancel()}
                className="px-6 py-2 rounded hover:bg-(--light-brown-color) hover:scale-90 transition-all duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="!text-white px-6 py-2 bg-(--dark-brown-color) rounded hover:scale-90 transition-all duration-300 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default ProfileComp;
