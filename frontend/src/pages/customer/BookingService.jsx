import { useCallback, useEffect, useState } from "react";
import ServiceCard from "../../components/service/ServiceCard";
import testImg from "../../assets/test.png"; // to be replaced by API data. don't forget to delete.
import BookingPopup from "../../components/BookingPopup";
import { filteredObjectByType } from "../../utils/HandleSearch";

const BookingService = () => {
	const demoData = [
		// to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Boarding", review: 4.5, forwhich: "small", price: 2000, pageAmount : 3 }, // to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Grooming", review: 4.0, forwhich: "big", price: 1500, pageAmount : 4 }, // to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Training", review: 4.8, forwhich: "small", price: 3000, pageAmount : 5 }, // to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Walking", review: 4.2, forwhich: "big", price: 500, pageAmount : 13 }, // to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Vet Visit", review: 4.7, forwhich: "small", price: 2500, pageAmount : 13 }, // to be replaced by API data. don't forget to delete.
		{image: testImg, name: "Daycare", review: 4.3, forwhich: "big", price: 1800, pageAmount : 1 }, // to be replaced by API data. don't forget to delete.
	]; // to be replaced by API data. don't forget to delete.

	const [service, setService] = useState(demoData);
	const [filter, setFilter] = useState("");
	const [noResult, setNoResult] = useState(false);
	const [popUpStatus, setPopUpStatus] = useState(false);
	const [popUpData, setPopUpData] = useState([]);

	const filterService = filteredObjectByType(service, filter, "name");

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
		if (filterService.length === 0) {
			setNoResult(true);
		} else {
			setNoResult(false);
		}
	}, [filter]);

	// handle popup data and status
	const handlePopUpData = useCallback((data, status) => {
		setPopUpStatus(status);
		setPopUpData(data);
	}, []);

	return (
		<div className="w-full max-w-6xl mx-auto py-12">
			<b className="text-7xl text-center block m-8 mt-0">Our Service</b>
			<div className="flex my-8 mx-auto w-5/10 border-2 rounded-4xl px-4 py-2 text-3xl">
				<i className="bi bi-search opacity-50 pr-2 flex justify-center item-center -bottom-1 relative "></i>
				<input
					className="w-full outline-0 placeholder:opacity-75"
					placeholder="search"
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>

			{noResult ? (
				<p className="text-2xl w-full text-center mt-32 italic">
					Sorry, your desired service is not on operation now.
				</p>
			) : (
				<div className="grid grid-cols-4 gap-x-8 gap-y-4">
					{filterService.map((data, idx) => {
						return (
							<ServiceCard
								key={idx}
								data = {data}
								onClick={handlePopUpData}
							/>
						);
					})}
				</div>
			)}

			<BookingPopup
				status={popUpStatus}
				data={popUpData}
				onClick={handlePopUpData}
			/>
		</div>
	);
};

export default BookingService;
