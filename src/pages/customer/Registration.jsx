import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; 
import registerImg from "../../assets/foot.png"; 
import { handleChange as createHandleChange, validateForm } from "../../utils/HandleRegisterPage";

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
    
    const navigate = useNavigate();
    const handleChange = createHandleChange(form, setForm);
    const isFormValid = Object.values(form).every((field) => field.trim() !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;
    alert("Registration Successful");
    navigate("/room");
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[60%] h-full ">
        <img className="w-full h-full object-cover" src={registerImg} alt="Registration" />
      </div>
      <div className="w-[40%] h-full bg-[var(--cream-color)]">
        <h1 className="text-center pt-5 text-[40px] text-[var(--brown-color)] font-bold">
          Registration
        </h1>
        <form className="flex flex-col space-y-2 p-5" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label
                className="text-[var(--brown-color)] font-semibold"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)]"
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange} 
              />
            </div>
          ))}
          <h2 className="text-[var(--brown-color)] font-semibold">Address</h2>
          <textarea
            name="Address"
            placeholder="Address"
            value={form.Address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)]"
            rows="3"
          ></textarea>
          <div className="flex float-right gap-4 p-2 ml-auto">
            <NavLink to="/login">
                <button 
                type="button" 
                className="w-40 h-10 text-[var(--dark-brown-color)] bg-[var(--light-brown-color)] rounded shadow px-4 py-2 transition-colors"
                >
                cancel
                </button>
            </NavLink>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-40 h-10 !text-[var(--beige-cream-color)] rounded shadow px-4 py-2 ${
                isFormValid
                  ? "bg-[var(--dark-brown-color)]"
                  : "!text-[var(--beige-cream-color)] bg-[var(--light-brown-color)] cursor-not-allowed"
              }`}
            >
              done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
