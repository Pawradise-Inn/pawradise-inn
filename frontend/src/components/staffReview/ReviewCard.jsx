const ReviewCard = ({ review, onDelete }) => {
  return (
    <div className="mb-6 flex gap-6 rounded-2xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.07)]">
      <div className="h-[120px] w-[120px] flex-shrink-0 rounded-xl bg-gray-100"></div>
      <div className="flex-shrink-0 pt-1">
        <p className="text-base font-bold">{review.serviceName}</p>
        <p className="my-1 text-gray-600">{review.petName}</p>
        <p className="text-sm text-gray-500">{review.reviewDate}</p>
      </div>
      <div className="w-px bg-gray-200" />
      <div className="flex flex-grow flex-col">
        <div className="flex justify-between">
          <p className="font-bold">{review.customerName}</p>
          <p className="text-gray-600">{review.rating.toFixed(1)}/5.0 <span className="text-[#f5b32a]">★</span></p>
        </div>
        <p className="mb-4 mt-2 italic text-gray-700">"{review.reviewText}"</p>
        {review.staffReply && (
          <div>
            <p className="mb-2 font-bold">Staff reply</p>
            <div className="mt-2 rounded-lg bg-gray-50 p-4">
              <p className="italic text-gray-700">"{review.staffReply}"</p>
            </div>
          </div>
        )}
        <div className="mt-auto flex items-center justify-between pt-6">
          <button
            className="cursor-pointer rounded-lg bg-[#6F4E37] px-7 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            onClick={() => onDelete(review.id)}
          >
            Delete
          </button>
          <div className="flex gap-4">
            <button className="cursor-pointer rounded-lg bg-[#EADDCA] px-7 py-2.5 text-sm font-semibold text-[#6F4E37] transition-opacity hover:opacity-90">Hide</button>
            <button className="cursor-pointer rounded-lg bg-[#6F4E37] px-7 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;