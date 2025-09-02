import CommentCard from "./CommentCard";
import "../../styles/bookingBarStyle.css";
import { useEffect, useState } from "react";
import CommentStarSelector from "./CommentStarSelector";
import Pagination from "./Pagination";

// data: { image, name, review, forwhich, price, size, maxsize, headerType } of service and room

const BookingBar = ({ data }) => {
	const demoData = [
		// will be replaced by real data later which fetched from backend only 3 comments
		{
			// will be replaced by real data later which fetched from backend only 3 comments
			user: "leonado", // will be replaced by real data later which fetched from backend only 3 comments
			star: 5, // will be replaced by real data later which fetched from backend only 3 comments
			// will be replaced by real data later which fetched from backend only 3 comments
			detail:
				"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa ducimus dicta fugit quos rem? Corporis ipsa inventore expedita id adipisci cumque reprehenderit, quae optio tenetur. Rerum saepe quas porro dolor animi obcaecati. Corrupti, repudiandae velit rem autem eligendi magnam repellat eveniet tempore assumenda optio tenetur quas sint corporis nemo voluptatum voluptates aliquid dicta sed quia! Reiciendis dignissimos esse voluptatibus expedita dolorem molestiae neque quia recusandae, reprehenderit illo atque ipsa commodi ipsam corrupti quas voluptatum similique non minus alias adipisci sequi porro itaque aperiam. Repellat officia, reiciendis laudantium dicta ipsa maxime cumque animi placeat nobis. Animi minima sed tenetur voluptatem. Provident dolores quidem sequi reprehenderit odio, harum quisquam repellendus labore aliquam vitae illum quae optio et culpa officiis dignissimos placeat suscipit numquam at, unde soluta enim exercitationem porro necessitatibus? Rerum tenetur minus ipsa deserunt ut aliquid minima explicabo quo dolore repellendus ipsam magni consectetur tempora repudiandae, necessitatibus beatae laborum hic animi pariatur facilis! Vel ipsa tenetur officiis doloribus veritatis distinctio eveniet excepturi perferendis nisi maxime voluptates nihil laboriosam unde quae, autem modi quos cupiditate fuga enim dolorem aliquam eos quasi quam! Quis maiores quasi at praesentium corporis repellendus saepe id necessitatibus facilis commodi sed eligendi accusamus minima laboriosam, consequuntur non aut.", // will be replaced by real data later which fetched from backend only 3 comments
		}, // will be replaced by real data later which fetched from backend only 3 comments
		{
			// will be replaced by real data later which fetched from backend only 3 comments
			user: "anna", // will be replaced by real data later which fetched from backend only 3 comments
			star: 4, // will be replaced by real data later which fetched from backend only 3 comments
			// will be replaced by real data later which fetched from backend only 3 comments
			detail:
				"Good experience overall, but I felt the play area could be a bit cleaner.", // will be replaced by real data later which fetched from backend only 3 comments
		}, // will be replaced by real data later which fetched from backend only 3 comments
		{
			// will be replaced by real data later which fetched from backend only 3 comments
			user: "mike", // will be replaced by real data later which fetched from backend only 3 comments
			star: 3, // will be replaced by real data later which fetched from backend only 3 comments
			// will be replaced by real data later which fetched from backend only 3 comments
			detail:
				"Average stay. My cat seemed a bit stressed, but the staff were friendly.", // will be replaced by real data later which fetched from backend only 3 comments
		}, // will be replaced by real data later which fetched from backend only 3 comments
	]; // will be replaced by real data later which fetched from backend only 3 comments

	const [commentStarSelect, setCommentStarSelect] = useState(6);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageAmount, setPageAmount] = useState(10);
	const [comments, setComments] = useState(demoData);
	const [status, setStatus] = useState("--");
	const [formData, setFormData] = useState({
		entryDate: "",
		exitDate: "",
		enterTime: "",
		exitTime: "",
	});

	// handle comment star change
	const handleCommentStarChange = (star) => {
		setCommentStarSelect(star);
	};

	// handle pageNum change
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// handle form data change
	const handleFormDataChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	// handle form submit and check availability and validation
	const handleFormSubmit = (e) => {
		e.preventDefault();
		// fetch new data from backend API here and validate form data
		// fetch new data from backend API here and validate form data
		// fetch new data from backend API here and validate form data
		// fetch new data from backend API here and validate form data
		// fetch new data from backend API here and validate form data
		// fetch new data from backend API here and validate form data
	};

	// fetch new status when date or time change
	const fetchNewStatus = () => {
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
	};

	//  fetch pageAmount when starting web page
	useEffect(() => {
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
	}, []);

	// fetch new comment data when currentPage change
	useEffect(() => {
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
		// fetch new data from backend API here
	}, [currentPage]);

	return (
		<div className="w-1/2 bg-white rounded-3xl p-8 border-2 border-(--brown-color) ">
			{/* header dataial section */}
			<section className="my-5 flex justify-between">
				<div className="w-1/2">
					<p className="text-2xl mb-2 font-bold">
						{data.headerType} {data.name}
					</p>
					<p className="text-xl mb-2">Status {status}</p>
					<p className="text-xl mb-2">Suitable for {data.forwhich} pet</p>
				</div>
				<div className="w-1/2 flex flex-col items-end justify-between">
					<p className="text-xl rounded bg-(--light-brown-color) py-2 px-3">
						{data.size}/{data.maxsize}
					</p>
					<p className="text-2xl font-bold">{data.price} ฿</p>
				</div>
			</section>
			<hr />

			{/* booking detail section */}
			<section className="py-5 px-4">
				<b className="text-3xl block mb-2">Your pet</b>
				<div className="relative">
					<select className="inline-block mb-4 w-full rounded-xl px-4 py-2 text-2xl my-2 outline-0 bg-(--light-brown-color) appearance-none cursor-pointer">
						<option>Select your pet</option>
					</select>
					<i className="bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-2/3 flex justify-center items-center text-2xl !text-white cursor-pointer pointer-events-none"></i>
				</div>
				<form onSubmit={handleFormSubmit}>
					<b className="mb-2 text-3xl inline-block w-1/2 ">Entry date</b>
					<b className="mb-2 text-3xl inline-block w-1/2">Exit date</b>
					<div className="relative mb-4 w-full rounded-xl text-2xl bg-(--light-brown-color) before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-3/4 before:border-2 before:border-(--dark-brown-color)">
						<input
							required
							type="date"
							className="relative w-1/2 rounded-2xl px-4 py-2 text-3xl outline-0 cursor-pointer"
							onChange={handleFormDataChange}
							name="entryDate"
						/>
						<i className="bi bi-caret-down-fill absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white cursor-pointer pointer-events-none"></i>
						<input
							required
							type="date"
							className="relative w-1/2 rounded-2xl px-4 py-2 text-3xl outline-0 cursor-pointer"
							onChange={handleFormDataChange}
							name="exitDate"
						/>
						<i className="bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white cursor-pointer pointer-events-none"></i>
					</div>
					{data.headerType === "Service" ? (
						<>
							<b className="mb-2 text-3xl inline-block w-1/2 ">Entry time</b>
							<b className="mb-2 text-3xl inline-block w-1/2">Exit time</b>
							<div className="relative mb-4 w-full rounded-xl text-2xl bg-(--light-brown-color) before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-3/4 before:border-2 before:border-(--dark-brown-color)">
								<input
									required
									type="time"
									className="relative w-1/2 rounded-2xl px-4 py-2 text-3xl outline-0 cursor-pointer"
									onChange={handleFormDataChange}
									name="enterTime"
								/>
								<i className="bi bi-caret-down-fill absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white cursor-pointer pointer-events-none"></i>
								<input
									required
									type="time"
									className="relative w-1/2 rounded-2xl px-4 py-2 text-3xl outline-0 cursor-pointer"
									onChange={handleFormDataChange}
									name="exitTime"
								/>
								<i className="bi bi-caret-down-fill absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-2xl !text-white cursor-pointer pointer-events-none"></i>
							</div>
						</>
					) : null}
					<button className="block w-full bg-(--dark-brown-color) rounded !text-white text-center py-1  text-3xl mt-10 mb-4 cursor-pointer hover:bg-(--brown-color) transition-all duration-200">
						BOOK
					</button>
				</form>
				<div className="flex justify-center gap-4 pr-5">
					<span>
						<a className="underline cursor-pointer hover:!text-(--light-brown-color) transition-all duration-200">
							Terms of Service
						</a>
					</span>
					<span>
						<a className="underline cursor-pointer hover:!text-(--light-brown-color) transition-all duration-200">
							Privacy Policy
						</a>
					</span>
				</div>
			</section>
			<hr />

			{/* comment section */}
			<section>
				<b className="my-5 text-3xl block">
					{data.review}/5.0{" "}
					<i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i>
				</b>
				<div className="my-5 grid grid-cols-5 gap-2 bg-(--light-brown-color)  p-2">
					<CommentStarSelector
						star={6}
						commentStarSelect={commentStarSelect}
						onClick={() => handleCommentStarChange(6)}
					/>
					<CommentStarSelector
						star={5}
						commentStarSelect={commentStarSelect}
						onClick={() => handleCommentStarChange(5)}
					/>
					<CommentStarSelector
						star={4}
						commentStarSelect={commentStarSelect}
						onClick={() => handleCommentStarChange(4)}
					/>
					<CommentStarSelector
						star={3}
						commentStarSelect={commentStarSelect}
						onClick={() => handleCommentStarChange(3)}
					/>
					<CommentStarSelector
						star={2}
						commentStarSelect={commentStarSelect}
						onClick={() => handleCommentStarChange(2)}
					/>
					<CommentStarSelector
						star={1}
						commentStarSelect={commentStarSelect}
						onClick={() => handleCommentStarChange(1)}
					/>
					<CommentStarSelector
						star={0}
						commentStarSelect={commentStarSelect}
						onClick={() => handleCommentStarChange(0)}
					/>
				</div>
				<div className="my-5 flex gap-3 flex-col">
					{comments.map((data, index) => {
						return (
							<CommentCard
								key={index}
								user={data.user}
								star={data.star}
								detail={data.detail}
							/>
						);
					})}
				</div>

				<Pagination
					pageAmount={pageAmount}
					currentPage={currentPage}
					onClick={handlePageChange}
				/>
			</section>
		</div>
	);
};

export default BookingBar;
