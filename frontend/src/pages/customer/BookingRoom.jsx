import { useState, useEffect, useCallback, useMemo } from "react";
import RoomCard from "../../components/room/RoomCard";
import BookingPopup from "../../components/BookingPopup";
import { getWarningTextForDateValidation } from "../../utils/HandleValidation";
import { handleFormDataChange } from "../../utils/HandleForm";
import { fetchAllRoomsWithReviewsAPI } from "../../hooks/roomAPI";

const BookingRoom = () => {
	const petType = ["Dog", "Cat", "Bird", "Raccoon", "Fish  :)"];
	
	const [room, setRoom] = useState([]);
	const [formData, setFormData] = useState({
		entryDate: " ",
		exitDate: "z",
		entryTime: "13:00",
		exitTime: "10:00",
	});
	const [popUpStatus, setPopUpStatus] = useState(false);
	const [popUpData, setPopUpData] = useState([]);

	// fetch room data from backend and setRoom
	useEffect(() => {
		fetchAllRoomsWithReviewsAPI().then((data) => {
			  data.data.forEach((room) => {
				  room.headerType = "Room";
				  room.reviewStar = room.reviewStar.toFixed(1);
				  room.commentPages = Math.max(1, room.commentPages);
			  });
		
			  setRoom(data.data);
			});
	}, []);

	// check if there is no result after filtering
	const noResult = useMemo(() => {
		if (
			getWarningTextForDateValidation(formData.entryDate, formData.exitDate) !==
			""
		) {
			return true;
		} else {
			if (room.length === 0) {
				return true;
			} else {
				return false;
			}
		}
	}, [formData, room]);

	// handle popup data and status
	const handlePopUpData = useCallback((data, status) => {
		setPopUpStatus(status);
		setPopUpData(data);
	}, []);

	return (
		<div className="w-full max-w-6xl mx-auto py-12">
			<b className="text-7xl text-center block m-8 mt-0">Room Type</b>
			<form className="m-8 relative flex justify-center content-between border-2 border-(--brown-color) rounded-xl mx-auto w-6/10 max-w-[720px] pb-4 before:content-[''] before:w-px before:h-3/4 before:absolute before:top-1/2 before:left-3/10 before:-translate-x-1/2 before:-translate-y-1/2 before:border-1 before:border-(--brown-color)">
				<div className="flex flex-col justify-start items-center gap-6 w-3/10 py-4 px-8">
					<p className="text-xl font-bold">Pet type</p>
					<div className="relative mx-auto text-xl bg-(--brown-color) rounded-lg w-full">
						<select className="!text-white w-full  px-4 py-2 outline-0 appearance-none cursor-pointer">
							{petType.map((type, idx) => {
								return (
									<option className="bg-(--light-brown-color)" key={idx}>
										{type}
									</option>
								);
							})}
						</select>
						<i className="bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white pointer-events-none"></i>
					</div>
				</div>
				<div className="flex flex-col justify-start items-center gap-6 w-7/10 py-4 px-8">
					<p className="text-xl font-bold">Booking date</p>
					<div className="relative w-full rounded-xl bg-(--brown-color) before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-2/4 before:border-1 before:border-white">
						<input
							required
							type="date"
							className="relative w-1/2 !text-white rounded-2xl px-4 py-2 text-xl outline-0 cursor-pointer"
							onChange={(e) => handleFormDataChange(e, setFormData)}
							name="entryDate"
						/>
						<input
							required
							type="date"
							className="relative w-1/2 !text-white rounded-2xl px-4 py-2 text-xl outline-0 cursor-pointer"
							onChange={(e) => handleFormDataChange(e, setFormData)}
							name="exitDate"
						/>
					</div>
					<span className="text-center block w-full">
						<i className="!text-(--warning-color)">
							{getWarningTextForDateValidation(
								formData.entryDate,
								formData.exitDate
							)}
						</i>
					</span>
				</div>
			</form>

			{noResult ? (
				<p className="text-2xl w-full text-center mt-32 italic">
					Sorry, no available rooms match your desire.
				</p>
			) : (
				<div className="m-8 grid grid-cols-2 gap-y-4 gap-x-8">
					{room.map((data, idx) => {
						return (
							<RoomCard
								key={idx}
								data={data}
								onClick={handlePopUpData}
							/>
						);
					})}
				</div>
			)}

			{
				<BookingPopup
					status={popUpStatus}
					data={popUpData}
					onClick={handlePopUpData}
				/>
			}
		</div>
	);
};

export default BookingRoom;
