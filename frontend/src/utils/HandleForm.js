const handleFormDataChange = (event, setFormData) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};

const validateFormPassword = (form, createNotification) => {
  if (form.password !== form.confirmPassword) {
    createNotification("fail", "Register fail", "Password do not match.");
    return false;
  }
  return true;
};

const validateFormTel = (form, createNotification) => {
  const cleanPhone = form.phoneNumber.replace(/\D/g, "");

  if (!/^\d{10}$/.test(cleanPhone)) {
    createNotification("fail", "Register fail", "Phone number is invalid.");
    return false;
  }
  return true;
};

export { handleFormDataChange, validateFormPassword, validateFormTel };
