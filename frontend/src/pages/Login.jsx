import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Login_Image from "../assets/login.png";
import PawLogo from "../assets/logo.png";
import { loginAPI } from "../hooks/authAPI";
import { useAuth } from "../context/AuthProvider";
import { startUpVariants } from "../styles/animation";

const fields = [
  {
    label: "Username",
    name: "Username",
    type: "text",
    placeholder: "Username (For Login)",
  },
  {
    label: "Password",
    name: "Password",
    type: "password",
    placeholder: "Password",
  },
];

const Login = () => {
  const [form, setForm] = useState({
    Username: "",
    Password: "",
  });
  const navigate = useNavigate();
  const {setUser} = useAuth();

  const handleChange = (form, setForm) => (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginAPI(form.Username, form.Password).then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", res.user);
        setUser(res.user);
        navigate("/room");
      }
    });
  };

  const onChange = handleChange(form, setForm);
  const isFormValid = Object.values(form).every((field) => field.trim() !== "");

  return (
    <div className="flex flex-col md:flex-row w-full h-dvh overflow-hidden">
      <motion.div 
        className="w-full md:w-3/5 h-64 md:h-auto flex-shrink-0"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          className="w-full h-full object-cover"
          src={Login_Image}
          alt="Image login"
        />
      </motion.div>

      <motion.div 
        className="bg-[var(--cream-color)] w-full md:w-2/5 flex flex-col items-center justify-center p-6"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <motion.img
          src={PawLogo}
          alt="Logo"
          className="h-28 w-48 md:h-48 md:w-96 object-contain mt-4 md:mt-8"
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        />
        <motion.h1 
          className="text-2xl md:text-4xl text-[var(--dark-brown-color)] font-bold mt-4 md:mt-6"
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Pawradise In
        </motion.h1>

        <motion.form
          className="flex flex-col space-y-2 p-4 w-full max-w-md"
          onSubmit={(e) => handleSubmit(e, form, navigate)}
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {fields.map((field, index) => (
            <motion.div
              key={field.name}
              className="flex flex-col w-full items-center mx-auto"
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={index + 3}
            >
              <label
                className="text-[var(--brown-color)] font-semibold text-left w-full"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <input
                className="border-[var(--brown-color)] border-2 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)] w-full transition-all duration-200 hover:shadow-md"
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={onChange}
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={!isFormValid}
            className={`w-full md:w-40 h-10 mt-5 rounded shadow px-4 py-2 mx-auto ${
              isFormValid
                ? "!text-[var(--cream-color)] bg-[var(--dark-brown-color)] hover:bg-[var(--brown-color)] hover:!text-[var(--cream-color)] transition-colors cursor-pointer"
                : "bg-[var(--light-brown-color)]"
            }`}
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={5}
            whileHover={isFormValid ? { scale: 1.05 } : {}}
            whileTap={isFormValid ? { scale: 0.95 } : {}}
          >
            Login
          </motion.button>

          <motion.hr 
            className="border-t-2 border-[var(--brown-color)] w-3/4 my-4 mx-auto"
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={6}
          />

          <motion.p 
            className="text-[var(--brown-color)] font-medium text-center text-sm md:text-base"
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={7}
          >
            Don't have an account?
            <NavLink
              to="/register"
              className="text-l ml-2 !text-[var(--fail-color)] font-bold hover:underline transition-all duration-200"
            >
              Register here
            </NavLink>
          </motion.p>

          <motion.p 
            className="text-center text-xs md:text-sm font-normal !text-[var(--brown-color)] mt-4"
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={8}
          >
            <a href="/" className="underline hover:text-[var(--dark-brown-color)] transition-colors duration-200">
              Terms of Service
            </a>
            <a href="/" className="ml-3 underline hover:text-[var(--dark-brown-color)] transition-colors duration-200">
              Privacy Policy
            </a>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
