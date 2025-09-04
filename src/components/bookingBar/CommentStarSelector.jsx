// star: amount of star this component represents
// commentStar: current selected star amount
// onClick: function to set commentStar to star

const CommentStarSelector = ({ star, commentStarSelect, onClick }) => {

	// Determine background color based on whether this selector is selected
	const getBackgroundColor = (star) => {
		return commentStarSelect === star ? "bg-(--cream-color) outline-2" : "bg-white";
	}

	return (
		<>
			{star === 6 ? (
				<button onClick={onClick } className={`py-2 px-5 ${getBackgroundColor(star)} cursor-pointer transition-all duration-100 hover:bg-(--cream-color) hover:outline-2 outline-(--brown-color)`}>
					All
				</button>
			) : (
				<button onClick={onClick } className={`py-2 px-5 ${getBackgroundColor(star)} cursor-pointer transition-all duration-100 hover:bg-(--cream-color) hover:outline-2 outline-(--brown-color)`}>
					{star}{" "}
					<i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i>
				</button>
			)}
		</>
	);
};
export default CommentStarSelector;
