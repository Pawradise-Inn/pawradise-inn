import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import registerImg from "../../assets/register.png";
import {
  handleChange as createHandleChange,
  validateForm,
} from "../../utils/HandleRegisterPage";

const fields = [
  { label: "Firstname", name: "Firstname", type: "text", placeholder: "First Name" },
  { label: "Lastname", name: "Lastname", type: "text", placeholder: "Last Name" },
  { label: "Email", name: "Email", type: "email", placeholder: "Email" },
  { label: "Username", name: "Username", type: "text", placeholder: "Username (For Login)" },
  { label: "Password", name: "Password", type: "password", placeholder: "Password" },
  { label: "*Confirm Password", name: "ConfirmPassword", type: "password", placeholder: "Confirm Password" },
  { label: "Phone Number", name: "PhoneNumber", type: "text", placeholder: "0xxxxxxxxx" },
];

const Registration = () => {
  const [form, setForm] = useState({
    Firstname: "",
    Lastname: "",
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
    Address: "",
  });

  const [consentChecked, setConsentChecked] = useState(false);
  const navigate = useNavigate();
  const handleChange = createHandleChange(form, setForm);

  const isFormValid =
    Object.values(form).every((field) => field.trim() !== "") && consentChecked;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;
    alert("Registration Successful");
    navigate("/room");
  };

  return (
    <>
      {/* 🔍 DEBUG BAR: red on mobile, green on md+, blue on lg+ */}
      {/* <div className="h-2 w-full bg-red-500 md:bg-green-500 lg:bg-blue-500"></div> */}

      {/* Main layout */}
      <div className="flex flex-col md:flex-row w-full min-h-screen overflow-hidden">
        {/* Left side - Image */}
        <div className="w-full md:w-3/5 h-64 md:h-auto flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src={registerImg}
            alt="Registration"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-2/5 h-full bg-[var(--cream-color)] flex flex-col items-center justify-center p-4">
          <h1
            className="text-center pt-2 text-2xl md:text-3xl text-[var(--brown-color)] font-semibold"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            Registration
          </h1>

          <form
            className="flex flex-col space-y-2 p-2 w-full max-w-md"
            onSubmit={handleSubmit}
          >
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col w-full">
                <label
                  className="text-[var(--brown-color)] font-semibold text-left mb-1"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <input
                  className="border-2 border-[var(--dark-brown-color)] bg-white opacity-65 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)] shadow-lg w-full"
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="flex flex-col w-full">
              <label
                className="text-[var(--brown-color)] font-semibold text-left mb-1"
                htmlFor="Address"
              >
                Address
              </label>
              <textarea
                id="Address"
                name="Address"
                placeholder="Address"
                value={form.Address}
                onChange={handleChange}
                rows="2"
                className="border-2 border-[var(--dark-brown-color)] bg-white opacity-65 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)] shadow-lg w-full"
              />
            </div>

            <div className="flex items-center mt-2">
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
                  className="text-[var(--dark-brown-color)] underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/"
                  className="text-[var(--dark-brown-color)] underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Buttons - stack on mobile, row on md+ */}
            <div className="flex flex-col md:flex-row gap-4 mt-4 w-full justify-end">
              <NavLink to="/" className="w-full md:w-40">
                <button
                  type="button"
                  className="w-full h-10 text-[var(--dark-brown-color)] bg-[var(--light-brown-color)] rounded shadow px-4 py-2 hover:bg-[var(--brown-color)] hover:!text-[var(--beige-cream-color)] transition-colors cursor-pointer "
                >
                  Cancel
                </button>
              </NavLink>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full md:w-40 h-10 rounded shadow px-4 py-2 hover:bg-[var(--brown-color)] hover:!text-[var(--beige-cream-color)] transition-colors  cursor-pointer ${
                  isFormValid
                    ? "bg-[var(--dark-brown-color)] !text-[var(--beige-cream-color)]"
                    : "bg-[var(--light-brown-color)] cursor-not-allowed"
                }`}
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
