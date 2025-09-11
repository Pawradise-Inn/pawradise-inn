import BookingBar from "./bookingBar/BookingBar";
import { useEffect, useRef } from "react";

// status: boolean to show/hide popup
// data: data to be shown in popup
// onClick: function to close popup

const BookingPopup = ({ status, data, onClick }) => {
	const popupRef = useRef(null);

	// Show/hide popup based on status prop
	useEffect(() => {
		if (popupRef.current) {
			if (status) {
				document.body.style.overflow = "hidden";
				popupRef.current.style.display = "block";
			} else {
				document.body.style.overflow = "auto";
				popupRef.current.style.display = "none";
			}
		}
	}, [status]);

	return (
		<div
			ref={popupRef}
			className="fixed w-dvw h-dvh top-0 left-0 bg-black/60  z-10 overflow-auto"
		>
			<div className="relative p-10 flex gap-4 w-8/10 max-w-7xl bg-white mx-auto my-10 rounded-3xl z-10">
				<img
					src={data.image}
					alt="serviceImg"
					className="w-1/2 h-[580px] rounded-2xl object-center"
				/>
				<BookingBar data={data} />
				<i
					onClick={() => onClick([], false)}
					className="bi bi-x-lg flex justify-center items-center absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-3xl cursor-pointer transition-all duration-200 hover:scale-125"
				></i>
			</div>
		</div>
	);
};

export default BookingPopup;
