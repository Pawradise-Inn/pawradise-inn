import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import registerImg from "../../assets/register.png";
import { useNotification } from "../../context/notification/NotificationProvider";
import { registerAPI } from "../../hooks/authAPI";
import { validateFormPassword, validateFormTel } from "../../utils/handleForm";
import { useAuth } from "../../context/AuthProvider";
import { startUpVariants } from "../../styles/animation";

const Registration = () => {

  const { createNotification } = useNotification();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  

  const [consentChecked, setConsentChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useAuth();

  
const fields = [
  {
    label: "Firstname",
    name: "firstname",
    type: "text",
    placeholder: "First Name",
    autoComplete: "true",
  },
  {
    label: "Lastname",
    name: "lastname",
    type: "text",
    placeholder: "Last Name",
    autoComplete: "true",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Email",
    autoComplete: "true",
  },
  {
    label: "Username",
    name: "userName",
    type: "text",
    placeholder: "Username (For Login)",
    autoComplete: "true",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
    autoComplete: "false",
  },
  {
    label: "Confirm Password *",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    autoComplete: "false",
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
    type: "tel",
    placeholder: "0xxxxxxxxx",
    autoComplete: "true",
  },
];

  // post Customer data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid && validateFormPassword(form, createNotification) && validateFormTel(form, createNotification)) {
      // const { confirmPassword, ...formData } = form;
      // registerAPI(formData).then((res) => {
      //   if (res.token) {
      //     localStorage.removeItem("token");
      //     localStorage.setItem("token", res.token);
      //     localStorage.setItem("user", JSON.stringify(res.user));
      //     navigate("/room");
      //     setUser(res.user);
      //   } else {
      //     createNotification(
      //       "fail",
      //       "Invalid username and phone number",
      //       "your username, email and phone number must be unique."
      //     );
      //   }
      // });
      try {
        const { confirmPassword, ...formData } = form;
        const res = await registerAPI(formData);

        createNotification({
          status: 'success',
          header: 'Registration Successful!',
          text: 'Welcome! You will be redirected shortly'
        })

        localStorage.setItem('token', res.token);
        setUser(res.user);
        navigate("/room");
      } catch (err) {
        console.error("Registrarion failed, notification handled by interceptor:", err);
      }
    }
  };

  //  changing data in form according to input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // setIsFormValid when every input is filled and consent is checked
  useEffect(() => {
    setIsFormValid(
      Object.values(form).every((field) => field.trim() !== "") &&
        consentChecked
    );
  }, [form, consentChecked]);

  // useEffect(() => {
  //   localStorage.removeItem("token");
  // }, [])

  return (
    <>
      <div className="flex flex-row w-full overflow-auto bg-[var(--cream-color)]">
        <motion.div 
          className="w-3/5"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            className="object-cover w-full h-full scale-105"
            src={registerImg}
            alt="Registration"
          />
        </motion.div>

        <div 
          className="w-2/5 flex flex-col items-center justify-center py-8"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.h1
            className="text-center pt-2 text-[60px] md:text-3xl text-[var(--brown-color)] font-semibold"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" }}
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Registration
          </motion.h1>

          <form
            className="flex flex-col space-y-2 p-2 w-full max-w-md"
            onSubmit={handleSubmit}
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {fields.map((field, index) => (
              <motion.div 
                key={field.name} 
                className="flex flex-col w-full"
                variants={startUpVariants}
                initial="hidden"
                animate="visible"
                custom={index /3+ 1}
              >
                <label
                  className="text-[var(--brown-color)] font-semibold text-left mb-1"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  className="border-[var(--brown-color)] border-2 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)] w-full transition-all duration-200 hover:shadow-md outline-0"
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  autoComplete={field.autoComplete}
                  required
                />
              </motion.div>
            ))}

            <motion.div 
              className="flex items-center mt-2"
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={3.66}
            >
              <input
                type="checkbox"
                id="consent"
                checked={consentChecked}
                onChange={() => setConsentChecked(!consentChecked)}
                className="mr-2 accent-[var(--dark-brown-color)] w-5 h-5 cursor-pointer"
              />

              <label htmlFor="consent" className="text-[var(--brown-color)]">
                I agree to the{" "}
                <a
                  href="/"
                  className="text-[var(--dark-brown-color)] underline hover:text-[var(--brown-color)] transition-colors duration-200"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/"
                  className="text-[var(--dark-brown-color)] underline hover:text-[var(--brown-color)] transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </label>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row gap-4 mt-2 w-full justify-end"
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <NavLink to="/login" className="w-full md:w-40">
                <motion.button
                  type="button"
                  className="w-full h-10 bg-[var(--dark-brown-color)] !text-[var(--cream-color)] rounded shadow px-4 py-1 hover:scale-105 transition-all duration-200 cursor-pointer "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </NavLink>

              <motion.button
                type="submit"
                disabled={!isFormValid}
                className={`w-full md:w-40 h-10 rounded shadow px-4 py-1 transition-all duration-200  ${
                  isFormValid
                    ? "bg-[var(--dark-brown-color)] !text-[var(--cream-color)] cursor-pointer hover:scale-105"
                    : "bg-[var(--light-brown-color)] cursor-not-allowed"
                }`}
                whileHover={isFormValid ? { scale: 1.05 } : {}}
                whileTap={isFormValid ? { scale: 0.95 } : {}}
              >
                Done
              </motion.button>
            </motion.div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
