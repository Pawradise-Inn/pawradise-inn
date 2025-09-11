// registrationHandlers.js
export const handleChange = (form, setForm) => (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

export const validateForm = (form) => {
  if (form.Password !== form.ConfirmPassword) {
    alert("Password do not match");
    return false;
  }
//   if (!Object.values(form).every((field) => field.trim() !== "")) {
//     alert("Please fill in all fields!");
//     return false;
//   }
  return true;
};
