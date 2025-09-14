// funtion for adjust data according to form input
// @param
// event: DOM component
// setFormData: set state function (useState())
const handleFormDataChange = (event, setFormData) => {
	const { name, value } = event.target;
	setFormData((prevData) => ({ ...prevData, [name]: value }));
};

export { handleFormDataChange }