// pageAmount: total number of pages
// currentPage: current page number
// onClick: function to handle page change, takes the new page number as argument

const Pagination = ({ pageAmount, currentPage, onClick }) => {
	
    // Generate an array of page numbers in range min(current-5, current-currentPage) to display
    const getPageNumberDisplay = () => {
        return Array.from({ length: Math.min(5, pageAmount-currentPage+1)}, (_, i) => i + currentPage);
    }

    // Check if the page number is the current page and hightlight it
    const getCurrentPageDisplay = (pageNum) => {
        return pageNum === currentPage;
    }

	return (
		<div className="my-10 flex justify-center items-center gap-1">
			{pageAmount > 5 ? (
				<>
					<i onClick={()=>onClick(1)} className="bi bi-chevron-double-left inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200"></i>
					<i onClick={()=>onClick(Math.max(1, currentPage-1))} className="bi bi-chevron-left inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200 mr-2"></i>
				</>
			) : null}
            
            {getPageNumberDisplay().map((pageNum) => (
                <button
                    key={pageNum}
                    className={` px-3 py-1 cursor-pointer hover:bg-(--light-brown-color) transition-all duration-200 rounded-full ${getCurrentPageDisplay(pageNum) ? 'bg-(--light-brown-color)' : null}`}
                    onClick={() => onClick(pageNum)}
                >
                    {pageNum}
                </button>
            ))}

			{pageAmount > 5 ? (
				<>
					<i onClick={()=>onClick(Math.min(pageAmount, currentPage+1))} className="bi bi-chevron-right inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200 ml-2"></i>
					<i onClick={()=>onClick(pageAmount)} className="bi bi-chevron-double-right inline-flex justify-center items-center text-2xl cursor-pointer hover:scale-125 p-1 transition-all duration-200"></i>
				</>
			) : null}
		</div>
	);
};

export default Pagination;
