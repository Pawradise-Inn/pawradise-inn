import { useEffect, useState } from "react";

// To test the "No reviews" message, you can make this array empty:
// const demoReviews = [];
const demoReviews = [
  {
    id: 1,
    serviceName: "Full Grooming",
    petName: "Max",
    reviewDate: "October 3, 2025",
    customerName: "Jane Doe",
    rating: 4.5,
    reviewText:
      "The service was fantastic! Max looks so clean and happy. The staff was very friendly and professional.",
    staffReply:
      "Thank you for your kind words, Jane! We were so happy to have Max with us and look forward to seeing you both again soon.",
    image: "",
  },
  {
    id: 2,
    serviceName: "Nail Clipping",
    petName: "Buddy",
    reviewDate: "October 1, 2025",
    customerName: "John Smith",
    rating: 5.0,
    reviewText:
      "Quick, easy, and stress-free for Buddy. Exactly what we needed. 10/10 would recommend.",
    staffReply: null,
    image: "",
  },
];

// --- Helper Component: ReviewCard ---
const ReviewCard = ({ review }) => {
  // ...styles remain the same...
  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.07)",
    display: "flex",
    gap: "1.5rem",
    marginBottom: "1.5rem",
  };
  const imagePlaceholderStyle = {
    width: "120px",
    height: "120px",
    backgroundColor: "#f0f0f0",
    borderRadius: "12px",
    flexShrink: 0,
  };
  const serviceInfoStyle = { flexShrink: 0, paddingTop: "0.25rem" };
  const separatorStyle = { width: "1px", backgroundColor: "#e5e7eb" };
  const reviewContentStyle = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  };
  const staffReplyContainerStyle = {
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    padding: "1rem",
    marginTop: "0.5rem",
  };
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: "1.5rem",
  };
  const rightButtonsStyle = { display: "flex", gap: "1rem" };
  const baseButtonStyle = {
    padding: "0.6rem 1.75rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
  };

  return (
    <div style={cardStyle}>
      <div style={imagePlaceholderStyle}></div>
      <div style={serviceInfoStyle}>
        <p style={{ fontWeight: "bold", margin: 0, fontSize: "1rem" }}>
          {review.serviceName}
        </p>
        <p style={{ margin: "0.25rem 0", color: "#555" }}>{review.petName}</p>
        <p style={{ margin: 0, color: "#888", fontSize: "0.9rem" }}>
          {review.reviewDate}
        </p>
      </div>
      <div style={separatorStyle} />
      <div style={reviewContentStyle}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontWeight: "bold", margin: 0 }}>{review.customerName}</p>
          <p style={{ margin: 0, color: "#555" }}>
            {review.rating.toFixed(1)}/5.0{" "}
            <span style={{ color: "#f5b32a" }}>★</span>
          </p>
        </div>
        <p
          style={{
            fontStyle: "italic",
            color: "#444",
            marginTop: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          "{review.reviewText}"
        </p>
        {review.staffReply && (
          <div>
            <p style={{ fontWeight: "bold", margin: "0 0 0.5rem 0" }}>
              Staff reply
            </p>
            <div style={staffReplyContainerStyle}>
              <p style={{ margin: 0, fontStyle: "italic", color: "#444" }}>
                "{review.staffReply}"
              </p>
            </div>
          </div>
        )}
        <div style={buttonContainerStyle}>
          <button
            style={{
              ...baseButtonStyle,
              backgroundColor: "#6F4E37",
              color: "white",
            }}
          >
            Delete
          </button>
          <div style={rightButtonsStyle}>
            <button
              style={{
                ...baseButtonStyle,
                backgroundColor: "#EADDCA",
                color: "#6F4E37",
              }}
            >
              Hide
            </button>
            <button
              style={{
                ...baseButtonStyle,
                backgroundColor: "#6F4E37",
                color: "white",
              }}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const StaffReviewPage = () => {
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(demoReviews);
  }, []);

  const noReviewsStyle = {
    textAlign: "center",
    marginTop: "4rem",
    fontSize: "1.25rem",
    color: "#6b7280",
    fontStyle: "italic",
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {/* ... Title and Filter Bar JSX ... */}
      <div className="relative max-w-7xl mx-auto pb-4">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-gray-800">
          Review
        </h1>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            height: "2px",
            backgroundColor: "#374151",
            width: "100%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            margin: "2rem 0",
            width: "100%",
            gap: "1rem",
          }}
        >
          <div className="flex flex-1 border-2 rounded-4xl px-4 py-3 text-xl min-w-[300px]">
            <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center -bottom-1 relative"></i>
            <input
              style={{
                width: "100%",
                outline: 0,
                backgroundColor: "transparent",
              }}
              placeholder="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#6F4E37",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1.125rem",
              whiteSpace: "nowrap",
              height: "100%",
            }}
          >
            xx/xx/xx
          </button>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#6F4E37",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1.125rem",
              whiteSpace: "nowrap",
              height: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            star <span>▼</span>
          </button>
        </div>
      </div>

      {/* --- Review List --- */}
      <div className="max-w-7xl mx-auto mt-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p style={noReviewsStyle}>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default StaffReviewPage;
