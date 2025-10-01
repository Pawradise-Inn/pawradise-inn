import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import registerImg from "../../assets/register.png";
import { addUserAPI } from "../../hooks/authAPI";
import { validateFormPassword, validateFormTel } from "../../utils/handleForm";

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

const Registration = () => {
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

  // post Customer data to database
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && validateFormPassword(form) && validateFormTel(form)) {
      addUserAPI(form).then((res) => {
        if (res.success) {
          navigate("/room");
        } else {
          alert("you userName, email and phoneNumber must be unique");
        }
      });
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

  return (
    <>
      <div className="flex flex-row w-full overflow-auto">
        <div className="w-3/5">
          <img
            className="object-cover w-full h-full "
            src={registerImg}
            alt="Registration"
          />
        </div>

        <div className="w-2/5 bg-[var(--cream-color)] flex flex-col items-center justify-center py-8">
          <h1
            className="text-center pt-2 text-[60px] md:text-3xl text-[var(--brown-color)] font-semibold"
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
                  id={field.name}
                  className="border-2 border-[var(--dark-brown-color)] bg-white opacity-65 rounded-md p-2 outline-none focus:ring-2 focus:ring-[var(--light-brown-color)] focus:border-transparent shadow-lg w-full transition-all duration-200"
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  autoComplete={field.autoComplete}
                  required
                />
              </div>
            ))}

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
                <a href="/" className="text-[var(--dark-brown-color)] underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/" className="text-[var(--dark-brown-color)] underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-2 w-full justify-end">
              <NavLink to="/login" className="w-full md:w-40">
                <button
                  type="button"
                  className="w-full h-10 bg-[var(--dark-brown-color)] !text-[var(--cream-color)] rounded shadow px-4 py-1 hover:scale-105 transition-all duration-200 cursor-pointer "
                >
                  Cancel
                </button>
              </NavLink>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full md:w-40 h-10 rounded shadow px-4 py-1 transition-all duration-200  ${
                  isFormValid
                    ? "bg-[var(--dark-brown-color)] !text-[var(--cream-color)] cursor-pointer hover:scale-105"
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
