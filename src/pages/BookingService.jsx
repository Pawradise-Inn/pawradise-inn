import { useEffect, useState } from "react";
import ServiceCard from "../components/service/ServiceCard";
import testImg from "../assets/test.png"; // to be replaced by API data. don't forget to delete.
import ServiceBookingPopup from "../components/service/ServiceBookingPopup";

const BookingService = () => {
	const demoData = [
		// to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Boarding", review: 4.5, forwhich: "small", price: 2000, size: 10, maxsize: 20 }, // to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Grooming", review: 4.0, forwhich: "big", price: 1500, size: 5, maxsize: 10 }, // to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Training", review: 4.8, forwhich: "small", price: 3000, size: 2, maxsize: 5 }, // to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Walking", review: 4.2, forwhich: "big", price: 500, size: 8, maxsize: 15 }, // to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Vet Visit", review: 4.7, forwhich: "small", price: 2500, size: 1, maxsize: 3 }, // to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Daycare", review: 4.3, forwhich: "big", price: 1800, size: 12, maxsize: 20 }, // to be replaced by API data. don't forget to delete.
	]; // to be replaced by API data. don't forget to delete.

	const [service, setService] = useState(demoData);
	const [filter, setFilter] = useState("");
	const [noResult, setNoResult] = useState(false);
	const [popUpStatus, setPopUpStatus] = useState(false);
	const [popUpData, setPopUpData] = useState([]);

	// fetch service data from backend and setService
	useEffect(() => {
		// fetch service data from backend and setService
		// fetch service data from backend and setService
		// fetch service data from backend and setService
		// fetch service data from backend and setService
		// fetch service data from backend and setService

		service.forEach((data) => {
			data.headerType = "Service";
		});

		setService(service);
	}, []);

	// check if there is no result after filtering
	useEffect(() => {
		if (filterService().length === 0) {
			setNoResult(true);
		} else {
			setNoResult(false);
		}
	}, [filter]);

	// handle popup data and status
	const handlePopUpData = (data, status) => {
		setPopUpStatus(status);
		setPopUpData(data);
	}

	// handle search input change
	const handleTypeService = (e) => {
		setFilter(e.target.value);
	};

	// filter service based on search input
	const filterService = () => {
		return service.filter((data) =>
			data.name.toLowerCase().includes(filter.toLowerCase())
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
								onClick={() => handlePopUpData(data, true)}
							/>
						);
					})}
				</div>
			)}

			<ServiceBookingPopup
				status={popUpStatus}
				data={popUpData}
				onClick={() => handlePopUpData([], false)}
			/>
		</div>
	);
};

export default BookingService;
