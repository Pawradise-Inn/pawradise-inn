// funtion for return filtered object with specific filter with object.type
// @param
// origin: filtered object
// filter: filtering text
// type: typr of object using for filter
const filteredObjectByType = (origin, filter, type) => {
	return origin.filter((data) =>
		data[type].toLowerCase().includes(filter.toLowerCase())
	);
};

export { filteredObjectByType }
