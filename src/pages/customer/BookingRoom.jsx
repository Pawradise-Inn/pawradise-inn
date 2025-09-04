import { useState, useEffect } from "react";
import RoomCard from "../../components/room/RoomCard";
import testImg from "../../assets/test.png"; // to be replaced by API data. don't forget to delete.
import ServiceBookingPopup from "../../components/BookingPopup";

const BookingRoom = () => {

	const petType = ["Dog", "Cat", "Bird", "Raccoon", "Fish  :)"];

	const demoData = [
		{
			image: testImg,
			status: "full",
			roomId: 1,
			review: 4.5,
			forwhich: "small",
			price: 2000,
			size: 10,
			maxsize: 20,
		}, // to be replaced by API data. don't forget to delete.
		{
			image: testImg,
			status: "full",
			roomId: 2,
			review: 4.0,
			forwhich: "big",
			price: 1500,
			size: 5,
			maxsize: 10,
		}, // to be replaced by API data. don't forget to delete.
		{
			image: testImg,
			status: "full",
			roomId: 3,
			review: 4.8,
			forwhich: "small",
			price: 3000,
			size: 2,
			maxsize: 5,
		}, // to be replaced by API data. don't forget to delete.
		{
			image: testImg,
			status: "full",
			roomId: 4,
			review: 4.2,
			forwhich: "big",
			price: 500,
			size: 8,
			maxsize: 15,
		}, // to be replaced by API data. don't forget to delete.
		{
			image: testImg,
			status: "full",
			roomId: 5,
			review: 4.7,
			forwhich: "small",
			price: 2500,
			size: 1,
			maxsize: 3,
		}, // to be replaced by API data. don't forget to delete.
		{
			image: testImg,
			status: "available",
			roomId: 6,
			review: 4.3,
			forwhich: "big",
			price: 1800,
			size: 12,
			maxsize: 20,
		}, // to be replaced by API data. don't forget to delete.
	];
	const [room, setRoom] = useState(demoData);
	const [noResult, setNoResult] = useState(false);
	const [popUpStatus, setPopUpStatus] = useState(false);
	const [popUpData, setPopUpData] = useState([]);

	// fetch room data from backend and setRoom
	useEffect(() => {
		// fetch room data from backend and setRoom
		// fetch room data from backend and setRoom
		// fetch room data from backend and setRoom
		// fetch room data from backend and setRoom
		// fetch room data from backend and setRoom

		room.forEach((data) => {
			data.headerType = "Room";
			data.roomId = data.roomId.toString().padStart(3, 0);
		});
	});

	// check if there is no result after filtering
	useEffect(() => {
		if (room.length === 0) {
			setNoResult(true);
		} else {
			setNoResult(false);
		}
	}, []);

	// handle popup data and status
	const handlePopUpData = (data, status) => {
		setPopUpStatus(status);
		setPopUpData(data);
	}

	return (
		<div className="w-full max-w-6xl mx-auto py-12">
			<b className="text-7xl text-center block m-8 mt-0">Room Type</b>
			<form className="m-8 relative flex justify-center content-between border-2 border-(--brown-color) rounded-xl mx-auto w-6/10 max-w-[720px] pb-4 before:content-[''] before:w-px before:h-3/4 before:absolute before:top-1/2 before:left-3/10 before:-translate-x-1/2 before:-translate-y-1/2 before:border-1 before:border-(--brown-color)">
				<div className="flex flex-col justify-between items-center gap-6 w-3/10 py-4 px-8">
					<p className="text-xl font-bold">Pet type</p>
					<div className="relative mx-auto text-xl bg-(--brown-color) rounded-lg w-full">
						<select className="!text-white w-full  px-4 py-2 outline-0 appearance-none cursor-pointer">
							{petType.map((type, idx) => {
								return (
									<option className="bg-(--light-brown-color)" key={idx}>{type}</option>
								)
							})}
						</select>
						<i className="bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white pointer-events-none"></i>
					</div>
				</div>
				<div className="flex flex-col justify-between items-center gap-6 w-7/10 py-4 px-8">
					<p className="text-xl font-bold">Booking date</p>
					<div className="relative w-full rounded-xl bg-(--brown-color) before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-2/4 before:border-1 before:border-white">
						<input
							required
							type="date"
							className="relative w-1/2 !text-white rounded-2xl px-4 py-2 text-xl outline-0 cursor-pointer"
							name="entryDate"
						/>
						<input
							required
							type="date"
							className="relative w-1/2 !text-white rounded-2xl px-4 py-2 text-xl outline-0 cursor-pointer"
							name="exitDate"
						/>
					</div>
				</div>
			</form>

			{noResult ? (
				<p className="text-2xl w-full text-center mt-32 italic">
					Sorry, your desired service is not on operation now.
				</p>
			) : (
				<div className="m-8 grid grid-cols-2 gap-y-4 gap-x-8">
					{room.map((data, idx) => {
						return <RoomCard key={idx} data={data} onClick={() => handlePopUpData(data, true)} />;
					})}
				</div>
			)}

			{

			<ServiceBookingPopup
				status={popUpStatus}
				data={popUpData}
				onClick={() => handlePopUpData([], false)}
			/>}
		</div>
	);
};

export default BookingRoom;
