// src/pages/Login.jsx
import { useMemo, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Login_Image from "../assets/login.png";
import PawLogo from "../assets/logo.png";
import { getMeAPI, loginAPI } from "../hooks/authAPI";
import { useAuth } from "../context/AuthProvider";
import { startUpVariants } from "../styles/animation";
import {useNotification} from "../context/notification/NotificationProvider"
import { useScrollUpArrow } from "../context/ScrollUpArrowProvider";

export default function Login({
  role: roleProp,
  redirectTo: redirectProp,
  title: titleProp,
}) {
  const { createNotification } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { setShow } = useScrollUpArrow();

  useEffect(() => {
    setShow(false);
    return () => setShow(true);
  }, []);

  const role = useMemo(() => {
    if (roleProp) return roleProp;
    return location.pathname.includes("/staff/") ? "staff" : "customer";
  }, [location.pathname, roleProp]);

  const redirectTo = useMemo(() => {
    if (redirectProp) return redirectProp;
    return role === "staff" ? "/staff/dashboard/" : "/room/";
  }, [role, redirectProp]);

  const pageTitle = useMemo(() => {
    if (titleProp) return titleProp;
    return role === "staff" ? "Staff Login" : "Pawradise Inn";
  }, [role, titleProp]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const [form, setForm] = useState({ Username: "", Password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    form.Username.trim() !== "" && form.Password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;
    setErr("");
    setLoading(true);
    try {
      // ปรับให้ตรงกับ backend: ถ้า loginAPI เดิมไม่รองรับ role ให้ลบบรรทัด role ทิ้ง
      const res = await loginAPI(form.Username, form.Password);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        const userData = await getMeAPI();
        if (userData?.data) {
          setUser(userData.data);
          localStorage.setItem("user", JSON.stringify(userData.data));
        }
        createNotification(
          'success',
          'Login Successful!',
          'Welcome! You will be redirected shortly'
        );
        navigate(redirectTo, { replace: true });
      } else {
        setErr("Login failed. Please check your username or password.");
      }
    } catch (e2) {
      //const msg = e2?.response?.data?.message || "Cannot sign in right now.";
      //setErr(msg);
      console.error("Login error:", e2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-dvh overflow-hidden bg-[var(--cream-color)]">
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

      <div className="w-full md:w-2/5 flex flex-col items-center justify-center p-6">
        <motion.img
          src={PawLogo}
          alt="Logo"
          className="h-28 w-48 md:h-48 md:w-96 object-contain mt-4 md:mt-8"
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        />
        <motion.h1
          className="text-2xl md:text-4xl text-[var(--dark-brown-color)] font-bold mt-4 md:mt-6"
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {pageTitle}
        </motion.h1>

        <form
          className="flex flex-col space-y-2 p-4 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          {/* Username */}
          <motion.div
            className="flex flex-col w-full items-center mx-auto"
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={2.33}
          >
            <label
              className="text-[var(--brown-color)] font-semibold text-left w-full"
              htmlFor="Username"
            >
              Username
            </label>
            <input
              className="border-[var(--brown-color)] border-2 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)] w-full transition-all duration-200 hover:shadow-md outline-0"
              type="text"
              name="Username"
              placeholder={
                role === "staff" ? "Employee username" : "Username (For Login)"
              }
              value={form.Username}
              onChange={onChange}
              required
            />
          </motion.div>

          {/* Password */}
          <motion.div
            className="flex flex-col w-full items-center mx-auto"
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={2.66}
          >
            <label
              className="text-[var(--brown-color)] font-semibold text-left w-full"
              htmlFor="Password"
            >
              Password
            </label>
            <input
              className="border-[var(--brown-color)] border-2 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)] w-full transition-all duration-200 hover:shadow-md outline-0"
              type="password"
              name="Password"
              placeholder="Password"
              value={form.Password}
              onChange={onChange}
              required
            />
          </motion.div>

          {/* Error */}
          {err && (
            <motion.p
              className="text-red-600 text-sm mt-2 text-center"
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={2.9}
            >
              {err}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full md:w-40 h-10 mt-5 rounded shadow px-4 py-2 mx-auto ${
              isFormValid && !loading
                ? "!text-[var(--cream-color)] bg-[var(--dark-brown-color)] hover:bg-[var(--brown-color)] hover:!text-[var(--cream-color)] transition-colors cursor-pointer"
                : "bg-[var(--light-brown-color)] cursor-not-allowed"
            }`}
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={3.2}
            whileHover={isFormValid && !loading ? { scale: 1.05 } : {}}
            whileTap={isFormValid && !loading ? { scale: 0.95 } : {}}
          >
            {loading ? "Signing in..." : "Login"}
          </motion.button>

          {/* Register link — โชว์เฉพาะลูกค้า */}
          {role === "customer" && (
            <div>
              <motion.hr
                className="border-t-2 border-[var(--brown-color)] w-3/4 my-4 mx-auto"
                variants={startUpVariants}
                initial="hidden"
                animate="visible"
                custom={3.4}
              />
              <motion.p
                className="text-[var(--brown-color)] font-medium text-center text-sm md:text-base"
                variants={startUpVariants}
                initial="hidden"
                animate="visible"
                custom={3.6}
              >
                Don't have an account?
                <NavLink
                  to="/register"
                  className="text-l ml-2 !text-[var(--fail-color)] font-bold hover:underline transition-all duration-200"
                >
                  Register here
                </NavLink>
              </motion.p>
            </div>
          )}

          {/* Footer links */}
          <motion.p
            className="text-center text-xs md:text-sm font-normal !text-[var(--brown-color)] mt-4"
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={3.8}
          >
            <a
              href="/"
              className="underline hover:text-[var(--dark-brown-color)] transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="/"
              className="ml-3 underline hover:text-[var(--dark-brown-color)] transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </motion.p>
        </form>
      </div>
    </div>
  );
}
