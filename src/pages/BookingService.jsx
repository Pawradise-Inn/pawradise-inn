import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import testImg from "../assets/test.png"; // to be replaced by API data. don't forget to delete.
import ServiceBookingPopup from "../components/ServiceBookingPopup";

const BookingService = () => {
	const demoData = [
		// to be replaced by API data. don't forget to delete.
		{ image: testImg, name: "Grooming", review: 5 }, // to be replaced by API data. don't forget to delete.
		{ image: testImg, name: "Walking", review: 4.5 }, // to be replaced by API data. don't forget to delete.
		{ image: testImg, name: "Sitting", review: 4.8 }, // to be replaced by API data. don't forget to delete.
		{ image: testImg, name: "Walking", review: 4.5 }, // to be replaced by API data. don't forget to delete.
		{ image: testImg, name: "Sitting", review: 4.8 }, // to be replaced by API data. don't forget to delete.
	]; // to be replaced by API data. don't forget to delete.

	const [service, setService] = useState("");
	const [noResult, setNoResult] = useState(false);

	// check if there is no result after filtering
	useEffect(() => {
		if (filterService().length === 0) {
			setNoResult(true);
		} else {
			setNoResult(false);
		}
	}, [service]);

	// handle search input change
	const handleTypeService = (e) => {
		setService(e.target.value);
	};

	// filter service based on search input
	const filterService = () => {
		return demoData.filter((data) =>
			data.name.toLowerCase().includes(service.toLowerCase())
		);
	};

	return (
		<div className="w-full max-w-6xl mx-auto">
			<b className="text-7xl text-center block m-8">Our Service</b>
			<div className="flex my-8 mx-auto w-5/10 border-2 rounded-4xl px-4 py-2 text-3xl">
				<i className="bi bi-search opacity-50 pr-2 flex justify-center item-center -bottom-1 relative "></i>
				<input
					className="w-full outline-0 placeholder:opacity-75"
					placeholder="search"
					onChange={handleTypeService}
				/>
			</div>

			{noResult ? (
				<p className="text-2xl w-full text-center mt-32 italic">
					Sorry, your desired service is not on operation now.
				</p>
			) : (
				<div className="grid grid-cols-4 gap-x-8 gap-y-4">
					{filterService().map((data, idx) => {
						return (
							<ServiceCard
								key={idx}
								img={data.image}
								name={data.name}
								review={data.review}
							/>
						);
					})}
				</div>
			)}

            {/* <ServiceBookingPopup  /> */}

		</div>
	);
};

export default BookingService;
