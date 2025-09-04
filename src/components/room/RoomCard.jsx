// data = {// data: { image, roomId, review, forwhich, price, size, maxsize } of room

const RoomCard = ({ data, onClick }) => {

	return (
		<div className="bg-(--cream-color) border-1 border-(--brown-color) rounded-2xl p-4 flex justify-start gap-4 hover:shadow-lg hover:scale-105 transition-all duration-200">
			<img
				src={data.image}
				alt="testImg"
				className="object-center rounded-2xl w-[180px] h-[180px]"
			/>
			<div className="flex justify-between w-full pr-8">
				<div className="flex flex-col justify-between h-full">
					<div>
						<p>Room_{data.roomId}</p>
						<p>Status : {data.status}</p>
						<p>Suitable for {data.forwhich}</p>
					</div>
					<div className="text-center py-2 px-4 bg-(--light-brown-color) rounded">
						{data.size} / {data.maxsize}
					</div>
				</div>
				<div className="flex flex-col justify-between h-full items-end">
					<p className="font-bold">{data.price} ฿ / night</p>
					<div className="flex flex-col gap-2 items-center">
						<p className="inline-block">
							{data.review} / 5.0{" "}
							<i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i>
						</p>
						<button onClick={onClick} className="py-2 px-8 bg-(--dark-brown-color) rounded !text-white font-bold hover:shadow-lg hover:scale-105 hover:bg-(--brown-color) cursor-pointer transition-all duration-200">
							BOOK
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomCard;
