// img: image URL of the service
// name: name of the service
// review: review score of the service
// onClick: function to handle click event on the card to show popup

const ServiceCard = ({img, name, review, onClick }) => {

	return (
		<div onClick={onClick} className="bg-(--cream-color) border-1  border-(--dark-brown-color) rounded-2xl px-4 py-2 hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200">
			<img src={img} alt={name} className="object-cover h-56 rounded-2xl mx-auto my-2" />
			<div className="flex flex-wrap justify-between items-center">
				<p>{name}</p>
				<p className="block bg-(--light-brown-color) rounded py-1 px-3">{review}/5.0{" "}<i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i></p>
			</div>
		</div>
	);
};
export default ServiceCard;
