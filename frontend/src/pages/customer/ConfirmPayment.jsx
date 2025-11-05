import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Using an inline SVG for the upload icon
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-amber-800"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ConfirmPayment = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    e.preventDefault();

    // Get the selected file
    let file = e.target.files[0];

    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
      setUploadedImage(file);
    }
  };

  // Clean up the object URL to avoid memory leaks
  useEffect(() => {
    // This is the cleanup function
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white p-4 sm:p-8 font-['Inter',_sans-serif] text-gray-800">
      <div className="w-full max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-800 text-center mb-8 sm:mb-12">
          Waiting for payment
        </h1>

        {/* Content Area: QR Code and Upload */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 w-full">
          {/* Left Side: QR Code */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 rounded-lg p-6 min-h-[300px] sm:min-h-[400px]">
            <img
              id="payment-qr"
              src="https://placehold.co/300x300/e2e8f0/64748b?text=QR+code"
              alt="Payment QR Code"
              className="w-full max-w-[300px] h-auto rounded-md shadow-sm"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src="https://placehold.co/300x300/e2e8f0/64748b?text=QR+Code+Placeholder";
              }}
            />
            <span className="mt-4 text-gray-600 font-medium">QR code</span>
          </div>

          {/* Right Side: Upload Evidence */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Total Price: xx.xx THB
            </h2>
            <h3 className="text-lg sm:text-xl font-medium text-gray-700 mt-4 mb-4">
              Please upload your evidence
            </h3>

            {/* Upload Box */}
            <label
              htmlFor="file-upload"
              className="flex-1 flex flex-col items-center justify-center bg-amber-50 rounded-lg p-6 min-h-[250px] sm:min-h-[300px] border-2 border-dashed border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors"
            >
              <img
                id="payment-upload"
                src={imagePreviewUrl || "https://placehold.co/300x150/fdf8e7/92400e?text=Upload+Evidence+Here"}
                alt="Upload evidence placeholder"
                className={`w-full max-w-[300px] h-auto object-contain rounded-md mb-4 ${imagePreviewUrl ? '' : 'hidden'}`} // Show if preview URL exists
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src="https://placehold.co/300x150/fdf8e7/92400e?text=Upload+Evidence+Here";
                }}
              />
              {!imagePreviewUrl && (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <UploadIcon />
                  </div>
                  <p className="text-amber-800">Drag & drop or click to upload</p>
                </div>
              )}
            </label>

            {/* Re-upload Button */}
            <div className="text-right mt-4">
              <label
                htmlFor="file-upload"
                className="inline-block px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition-colors"
              >
                Re-upload
              </label>
              <input 
                id="file-upload" 
                name="file-upload" 
                type="file" 
                className="sr-only" 
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-12 sm:mt-16">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-10 py-3 bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;