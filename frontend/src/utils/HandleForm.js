const handleFormDataChange = (event, setFormData) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};

const validateFormPassword = (form) => {
  if (form.password !== form.confirmPassword) {
    alert("Password do not match");
    return false;
  }
  return true;
};

const validateFormTel = (form) => {
  const cleanPhone = form.phoneNumber.replace(/\D/g, "");

  if (!/^\d{10}$/.test(cleanPhone)) {
	alert("Phone number is invalid");
    return false;
  }
  return true;
};

export { handleFormDataChange, validateFormPassword, validateFormTel };
