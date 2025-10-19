import { useEffect, useMemo, useState } from "react";

const ReviewCard = ({
  review,
  onDelete,
  onReply, // (id, text) => void | Promise<void>
  hidden: controlledHidden,
  onHideChange,
}) => {
  // hidden (controlled by parent if prop is given)
  const [uncontrolledHidden, setUncontrolledHidden] = useState(false);
  const hidden = controlledHidden ?? uncontrolledHidden;

  // editable reply draft
  const [draftReply, setDraftReply] = useState(review?.staffReply ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // ถ้า prop review.staffReply เปลี่ยน ให้ sync เข้า textarea
  useEffect(() => {
    setDraftReply(review?.staffReply ?? "");
  }, [review?.staffReply, review?.id]);

  const ratingText = useMemo(() => {
    const n = Number(review?.commenter_star);
    return Number.isFinite(n) ? `${n.toFixed(1)}/5.0` : "-/5.0";
  }, [review?.rating]);

  const handleHide = () => {
    if (controlledHidden === undefined) setUncontrolledHidden(true);
    onHideChange?.(true, review?.id);
  };
  const handleUnhide = () => {
    if (controlledHidden === undefined) setUncontrolledHidden(false);
    onHideChange?.(false, review?.id);
  };

  const handleSaveReply = async () => {
    try {
      setIsSaving(true);
      setJustSaved(false);
      await onReply?.(review?.id, draftReply?.trim() ?? "");
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1200);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      data-probe="REVIEW-CARD-ACTIVE"
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
            className="cursor-pointer rounded-md bg-[var(--light-brown-color)] px-4 py-1.5 text-sm font-semibold transition-opacity hover:opacity-90"
            onClick={handleUnhide}
          >
            Unhide
          </button>
        </div>
      ) : (
        <div className="flex gap-6 justify-start">
          {/* thumbnail */}
          <div className="h-[120px] w-[120px] flex-shrink-0 rounded-xl bg-gray-100" />

          {/* left info */}
          <div className="flex-shrink-0 pt-1">
            <p className="text-base font-bold">{review?.serviceName}</p>
            <p className="my-1 text-gray-600">{review?.petName}</p>
            <p className="text-sm text-gray-500">{new Date(review?.reviewDate).toLocaleDateString()}</p>
          </div>

          <div className="w-px bg-gray-200" />

          {/* right content */}
          <div className="flex flex-grow flex-col min-w-0">
            <div className="flex justify-between gap-3">
              <p className="font-bold truncate">{review?.commenter_name}</p>
              <p className="flex-shrink-0 text-gray-600">
                {ratingText} <i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i>
              </p>
            </div>

            <p className="mb-4 mt-2 italic text-gray-700 break-words">
              “{review?.commenter_detail}”
            </p>

            {/* staff reply editor (มีให้ทุกการ์ดเสมอ) */}
            <div className="mt-2">
              <p className="mb-2 font-bold">Staff reply</p>

              <div className="rounded-lg bg-gray-50 p-3 border border-gray-200">
                <textarea
                  value={draftReply}
                  onChange={(e) => setDraftReply(e.target.value)}
                  placeholder="Type your reply to the customer..."
                  className="w-full resize-y min-h-[84px] bg-transparent outline-none"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {draftReply.length} chars
                  </span>
                  <div className="flex items-center gap-3">
                    {justSaved && (
                      <span className="text-xs font-semibold text-green-700">
                        Saved
                      </span>
                    )}
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleSaveReply}
                      className={`cursor-pointer rounded-lg px-5 py-2 text-sm font-semibold !text-white transition-opacity ${
                        isSaving ? "opacity-60" : "hover:opacity-90"
                      } bg-[var(--brown-color)]`}
                    >
                      {isSaving ? "Saving..." : "Reply"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* actions */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                className="cursor-pointer rounded-lg bg-[var(--brown-color)] px-7 py-2.5 text-sm font-semibold !text-white transition-opacity hover:opacity-90"
                onClick={() => onDelete?.(review?.id)}
              >
                Delete
              </button>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="cursor-pointer rounded-lg bg-[var(--light-brown-color)] px-7 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                  onClick={handleHide}
                >
                  Hide
                </button>
                {/* ปุ่ม Reply หลักอยู่ใต้ textarea แล้ว */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
