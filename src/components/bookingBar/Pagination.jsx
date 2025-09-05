// pageAmount: total number of pages
// currentPage: current page number
// onClick: function to handle page change, takes the new page number as argument

import { getArrayWithRange } from "../../utils/HandleArray";

const Pagination = ({ pageAmount, currentPage, onClick }) => {

	// Check if the page number is the current page and hightlight it
	const getCurrentPageDisplay = (pageNum) => {
		return pageNum === currentPage;
	};

	return (
		<div className="my-10 flex justify-center items-center gap-1">
					<i
						onClick={() => onClick(1)}
						className="bi bi-chevron-double-left inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200"
					></i>
					<i
						onClick={() => onClick(Math.max(1, currentPage - 1))}
						className="bi bi-chevron-left inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200 mr-2"
					></i>

			{getArrayWithRange(5, currentPage, pageAmount).map((pageNum) => (
				<button
					key={pageNum}
					className={` px-3 py-1 cursor-pointer hover:bg-(--light-brown-color) transition-all duration-200 rounded-full ${
						getCurrentPageDisplay(pageNum) ? "bg-(--light-brown-color)" : null
					}`}
					onClick={() => onClick(pageNum)}
				>
					{pageNum}
				</button>
			))}

					<i
						onClick={() => onClick(Math.min(pageAmount, currentPage + 1))}
						className="bi bi-chevron-right inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200 ml-2"
					></i>
					<i
						onClick={() => onClick(pageAmount)}
						className="bi bi-chevron-double-right inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200"
					></i>
		</div>
	);
};

export default Pagination;
