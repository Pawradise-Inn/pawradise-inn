const handleFormDataChange = (event, setFormData) => {
	const { name, value } = event.target;
	setFormData((prevData) => ({ ...prevData, [name]: value }));
};

export { handleFormDataChange }