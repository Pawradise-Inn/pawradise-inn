import { useState, useMemo } from "react";

const ReviewCard = ({
  review,
  onDelete,
  onReply,          
  defaultHidden = false,
  hidden: controlledHidden, 
  onHideChange,     
}) => {

  const [uncontrolledHidden, setUncontrolledHidden] = useState(defaultHidden);
  const hidden = controlledHidden ?? uncontrolledHidden;

  const ratingText = useMemo(() => {
    const n = Number(review?.rating);
    return Number.isFinite(n) ? `${n.toFixed(1)}/5.0` : "-/5.0";
  }, [review?.rating]);

  const handleHide = () => {
    console.log("[ReviewCard] hide clicked", review?.id);
    if (controlledHidden === undefined) {
      setUncontrolledHidden(true);
    }
    onHideChange?.(true, review?.id);
  };

  const handleUnhide = () => {
    console.log("[ReviewCard] unhide clicked", review?.id);
    if (controlledHidden === undefined) {
      setUncontrolledHidden(false);
    }
    onHideChange?.(false, review?.id);
  };

  const handleDelete = () => {
    console.log("[ReviewCard] delete clicked", review?.id);
    onDelete?.(review?.id);
  };

  const handleReply = () => {
    console.log("[ReviewCard] reply clicked", review?.id);
    onReply?.(review);
  };

  return (
    <div
      data-probe="REVIEW-CARD-ACTIVE"
      data-review-id={review?.id}
      className={`mb-6 bg-white border border-[var(--brown-color)] rounded-2xl ${
        hidden ? "p-3 h-12 overflow-hidden" : "p-6"
      }`}
      role="article"
      aria-label={`Review card for ${review?.serviceName ?? "service"}`}
    >
      {hidden ? (
        <div className="flex items-center justify-between gap-3">
          <p className="truncate italic text-gray-600">This review is hidden</p>
          <button
            type="button"
            className="cursor-pointer rounded-md bg-[#EADDCA] px-4 py-1.5 text-sm font-semibold text-[#6F4E37] transition-opacity hover:opacity-90"
            onClick={handleUnhide}
          >
            Unhide
          </button>
        </div>
      ) : (
        <div className="flex gap-6 justify-start">
          <div className="h-[120px] w-[120px] flex-shrink-0 rounded-xl bg-gray-100" />
          <div className="flex-shrink-0 pt-1">
            <p className="text-base font-bold">{review?.serviceName}</p>
            <p className="my-1 text-gray-600">{review?.petName}</p>
            <p className="text-sm text-gray-500">{review?.reviewDate}</p>
          </div>

          <div className="w-px bg-gray-200" />

          <div className="flex flex-grow flex-col min-w-0">
            <div className="flex justify-between gap-3">
              <p className="font-bold truncate">{review?.customerName}</p>
              <p className="flex-shrink-0 text-gray-600">
                {ratingText} <span className="text-[#f5b32a]">★</span>
              </p>
            </div>

            <p className="mb-4 mt-2 italic text-gray-700 break-words">
              “{review?.reviewText}”
            </p>

            {!!review?.staffReply && (
              <div>
                <p className="mb-2 font-bold">Staff reply</p>
                <div className="mt-2 rounded-lg bg-gray-50 p-4">
                  <p className="italic text-gray-700">“{review?.staffReply}”</p>
                </div>
              </div>
            )}

            <div className="mt-auto flex items-center justify-between pt-6">
              <button
                type="button"
                className="cursor-pointer rounded-lg bg-[#6F4E37] px-7 py-2.5 text-sm font-semibold !text-white transition-opacity hover:opacity-90"
                onClick={handleDelete}
              >
                Delete
              </button>

              <div className="flex gap-4">
                <button
                  type="button"
                  className="cursor-pointer rounded-lg bg-[#EADDCA] px-7 py-2.5 text-sm font-semibold text-[#6F4E37] transition-opacity hover:opacity-90"
                  onClick={handleHide}
                >
                  Hide
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-lg bg-[#6F4E37] px-7 py-2.5 text-sm font-semibold !text-white transition-opacity hover:opacity-90"
                  onClick={handleReply}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
