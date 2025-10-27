import { useEffect, useMemo, useRef, useState } from "react";
import { deleteChatLogAPI, updateChatLogAPI } from "../../hooks/chatlogAPI";
import { getChatLogByIdAPI } from "../../hooks/chatlogAPI";
import { replyToChatLogAPI } from "../../hooks/chatlogAPI";
import { useAuth } from "../../context/AuthProvider";
import testImage from "../../assets/test.png";

const ReviewCard = ({ review, onDelete, onAfterReplySave, onAfterHideChange }) => {

  console.assert(review);
  const reviewId = review?.id;
  const [draftReply, setDraftReply] = useState();
  const lastIdRef = useRef(reviewId);
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);

  const initialFromProps = () => {
    getChatLogByIdAPI(reviewId).then(
      (res) => {
      const v2 = res?.data?.reply ?? res?.data?.staffReply ?? "";
      const testsrId = res?.data?.serviceId ?? res?.data?.roomId ?? "";
      setDraftReply(v2)
      setIsVisible(res.data.show)
    }
  )};

  useEffect(() => {
    initialFromProps();
    if (reviewId !== lastIdRef.current) {
      lastIdRef.current = reviewId;
    }
  }, []);

  const [isSavingReply, setIsSavingReply] = useState(false);
  const [justSavedReply, setJustSavedReply] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const ratingText = useMemo(() => {
    const n = Number(review?.commenter_star ?? review?.rating);
    return Number.isFinite(n) ? `${n.toFixed(1)}/5.0` : "-/5.0";
  }, [review?.commenter_star, review?.rating]);

  const toggleShow = async () => {
    if (!reviewId) return;
    setIsToggling(true);
    
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    
    try {
      const resp = await updateChatLogAPI(reviewId, { show: newVisibility });
      console.log("Updated visibility to:", newVisibility);
      if (!resp?.success) throw new Error("success=false");
      onAfterHideChange?.(reviewId, newVisibility);
    } catch (e) {
      // rollback on error
      setIsVisible(isVisible);
      console.error("Failed to toggle visibility", e);
    } finally {
      setIsToggling(false);
    }
  };


  const handleDelete  = async () => {
    if(!reviewId) return;

   try {
     const resp = await deleteChatLogAPI(reviewId);
     if(!resp?.success) {
       console.error("Failed to delete review");
       return;
     }
     onDelete?.(reviewId);
   } catch (error) {
      console.error("Failed to delete review", error);
   }
  }

  const handleSaveReply = async () => {
    const payload = (draftReply ?? "").trim();
    setIsSavingReply(true);
    setJustSavedReply(false);
    try {
      const resp = await replyToChatLogAPI(reviewId, { staffId:user.staffId ,reply: payload });
      if (!resp?.success) throw new Error("success=false");

      // Lock in our local text as the source of truth
      onAfterReplySave?.(reviewId, payload);
      setJustSavedReply(true);
      setTimeout(() => setJustSavedReply(false), 1200);
    } catch (e) {
      console.error("Failed to save reply", e);
    } finally {
      setIsSavingReply(false);
    }
  };

  return (
    <div
      data-probe="REVIEW-CARD-ACTIVE"
      className={`mb-6 bg-white border border-[var(--brown-color)] rounded-2xl ${
         "p-6"
      }`}
      role="article"
      aria-label={`Review card for ${review?.serviceName ?? "service"}`}
    >
        <div className="flex gap-6 justify-start">
          {/* thumbnail */}
          <img src={review?.serviceImg || review?.roomImg || testImage} className="object-center rounded-2xl w-[180px] h-[180px]"/>
    

          {/* left info */}
          <div className="flex-shrink-0 pt-1">
            <p className="text-base font-bold">{review?.serviceName || review?.roomName}</p>
            <p className="my-1 text-gray-600">{review?.petName}</p>
            <p className="text-sm text-gray-500">
              {/* your list uses 'review_date' (snake_case). Fall back if needed */}
              {review?.review_date
                ? new Date(review.review_date).toLocaleDateString()
                : review?.reviewDate
                ? new Date(review.reviewDate).toLocaleDateString()
                : ""}
            </p>
          </div>

          <div className="w-px bg-gray-200" />

          {/* right content */}
          <div className="flex flex-grow flex-col min-w-0">
            <div className="flex justify-between gap-3">
              <p className="font-bold truncate">
                {review?.commenter_name ?? review?.customerName ?? "Customer"}
              </p>
              <p className="flex-shrink-0 text-gray-600">
                {ratingText}{" "}
                <i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center" />
              </p>
            </div>

            <p className="mb-4 mt-2 italic text-gray-700 break-words">
              “{review?.commenter_detail ?? review?.review ?? ""}”
            </p>

            {/* staff reply editor */}
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
                    {/* {draftReply.length} characters */}
                  </span>
                  <div className="flex items-center gap-3">
                    {justSavedReply && (
                      <span className="text-xs font-semibold !text-green-700">
                        Saved
                      </span>
                    )}
                    <button
                      type="button"
                      disabled={isSavingReply}
                      onClick={handleSaveReply}
                      className={`cursor-pointer rounded-lg px-5 py-2 text-sm font-semibold !text-white transition-opacity ${
                        isSavingReply ? "opacity-60" : "hover:opacity-90"
                      } bg-[var(--brown-color)]`}
                    >
                      {isSavingReply ? "Saving..." : "Reply"}
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
                onClick={handleDelete}
              >
                Delete
              </button>
              <div className="flex gap-4">
                <button
                  type="button"
                  // disabled={isToggling}
                  className={`cursor-pointer rounded-lg bg-[var(--light-brown-color)] px-7 py-2.5 text-sm font-semibold transition-opacity ${
                    isToggling ? "opacity-60" : "hover:opacity-90"
                  }`}
                  onClick={() => toggleShow()}
                >
                  {isVisible ? "Hide" : "Unhide"}
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ReviewCard;
